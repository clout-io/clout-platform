/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');
const util = require('util');
const Promise = require('bluebird');
const IcoFilterValidation = require('../validation/ico.filters');
const IcoSortValidation = require('../validation/ico.sort');
const Validate = require('../validation/validator');
const joiErrorsToForms = require('joi-errors-for-forms').form();

module.exports = {

  index: async function (req, res) {
    const perPage = req.query.per_page || 20;
    const sort = req.query.sort || "started";
    const sortType = req.query.sortType || "desc";

    const currentPage = parseInt(req.query.page, 10) || 1;

    let filter = {};
    try {
      filter = JSON.parse(req.query.filter);
    } catch (e) {
    }
    let validateResult = await Validate(filter, IcoFilterValidation);

    let filterValidateResult = joiErrorsToForms(validateResult);

    if (filterValidateResult) {
      return res.status(400).json(filterValidateResult)
    }

    let sortValidationResult = await Validate({sort: sort, sortType: sortType}, IcoSortValidation);
    if (sortValidationResult) {
      return res.status(400).json(sortValidationResult)
    }


    let conditions = {};
    _.extend(conditions, filter);

    let followedIco = [];

    if (req.user) {
      let user = await User.findOne(req.user.id).populate('followedIcos', {select: "id"});
      let ids = await Promise.map(user.followedIcos, function (item) {
        return item.id;
      });
      if (ids) {
        conditions.id = {"!": ids}
      }
      let userCondition = {id: {"$in": ids}};

      _.extend(userCondition, filter);

      followedIco = await Ico.find(userCondition).populate(["socials", "team"]);
    }
    let resultData = {};
    try {
      resultData = await pager.paginate(Ico, conditions, currentPage, perPage, ["socials", "team"], `${sort} ${sortType}`);
    } catch (e) {
      return res.status(400).json(e);
    }

    if (currentPage !== 1) {
      return res.json(resultData)
    }
    if (followedIco) {
      resultData.data = followedIco.concat(resultData.data)
    }
    return res.json(resultData)
  },

  info: function (req, res) {
    var objectId = req.param("id");

    async.parallel(
      [function (callback) {
        Ico.findOne({id: objectId}).populateAll().then(function (ico) {
          callback(null, ico);
        }).catch(function (error) {
          callback(error);
        })

      },
        function (callback) {
          Like.count({objectId: objectId}).populateAll().then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          Comment.count({root: objectId}).then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Like.count({objectId: objectId, owner: req.user.id}).then(function (count) {
              callback(null, count > 0);
            }).catch(function (error) {
              callback(error);
            })
          }
        },
        function (callback) {
          Votes.count(objectId).then(function (data) {
            callback(null, data)
          }, function (err) {
            callback(err)
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Vote.findOne({objectId: objectId, owner: req.user.id}).then(function (vote) {
              if (vote) {
                callback(null, vote.vote);
              } else {
                callback(null, false)
              }
            }).catch(function (error) {
              callback(error);
            })
          }
        },
        function (callback) {
          if (req.user) {
            FollowedIco.count({ico: objectId, user: req.user.id}).then(function (count) {
              callback(null, count > 0)
            })
          } else {
            callback(null, false);
          }
        }
      ],
      function (err, result) {
        if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        var ico = result[0];
        if (!ico) return res.json(404, Errors.build(err, Errors.ERROR_NOT_FOUND));
        var count = result[1];
        var comments = result[2];
        var isLiked = result[3];
        var votes = result[4];
        var voted = result[5];
        var isFollow = result[6] || false;
        ico.likes = count || 0;
        ico.comments = comments || 0;
        ico.isLiked = isLiked;
        ico.votes = votes;
        ico.voted = voted;
        ico.isFollow = isFollow;
        res.json(ico);
      }
    )
  }
  ,


  search: async (req, res) => {
    let term = req.param('term');
    let userTags = await FollowedIco.find({user: req.user.id});

    userTags = _.map(userTags, function (item) {
      return item.ico;
    });


    let data = await Ico.find({slug: {contains: term}, select: ['slug']}).limit(15);
    data = _.map(data, function (item) {
      return item.id
    });

    data = data.filter(x => userTags.indexOf(x) === -1);
    let all = _.uniq(data).sort(function (a, b) {
      if (a.indexOf(term) < b.indexOf(term)) {
        return -1;
      } else {
        return 1
      }

    });
    res.json(all);
  },
  top:

    function (req, res) {
      let limit = req.param("top") || 10;
      Ico.find().sort("slug ASC").limit(limit).then(function (result) {
        res.json({data: result});
      }).catch(function (err) {
        res.json(400, err)
      })
    }

  ,
  alphabetList: async (req, res) => {
    let alphaObject = {};
    let icoList = await Ico.find({select: ['slug']}).sort("slug ASC");
    _.map(icoList, x => {
      if (_.isUndefined(alphaObject[x.slug[0]])) {
        alphaObject[x.slug[0]] = [];
      }
      alphaObject[x.slug[0]].push(x.slug);
      return x.slug
    });
    return res.json(alphaObject)
  },
  /*-----------------------------------------------------*/

  sync:

    function (req, res) {
      var type = req.param("type");
      CoinhillsAPI.getICOs(type).then(function (response) {
        var data = response.data;
        async.map(data, function (item, cb) {
          var members = item.members;
          var links = item.links;
          delete item.members;
          delete item.links;
          delete item.id;
          item.status = type;

          async.waterfall([
            function (callback) {
              Ico.findOrCreate({slug: item.slug}, item).then(function (ico) {
                callback(null, ico);
              }).catch(function (err) {
                callback(err)
              })
            },
            function (ico, callback) {
              IcoSocial.findOrCreate(links, links).then(function (created) {
                callback(null, ico, created)
              }).catch(function (err) {
                cb(err)
              })
            },
            function (ico, links, callback) {
              if (members.length) {
                IcoTeam.findOrCreate(members, members).then(function (created) {
                  callback(null, ico, links, created)
                }).catch(function (err) {
                  cb(err)
                })
              } else {
                callback(null, ico, links, [])
              }
            },
            function (ico, links, member, callback) {
              ico.socials.add(links);
              ico.team.add(member);
              ico.status = type;
              ico.save(function (err, r) {
                callback(null, ico)
              })
            }
          ], function (err, result) {
            cb(null, result)
          });
        }, function (err, finalRes) {
          if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
          return res.json(finalRes)
        });


      }, function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })
    }

  ,

  syncPhoto: function (req, res) {
    Ico.find().then(function (icos) {
      async.map(icos, function (item, cb) {
        if (!item.logoId) {
          return cb(null, null);
        }

        var template = "https://www.coinhills.com/images/uploaded/ico/%s/%s/%s/%s/%s-s";
        var lId = item.logoId;
        var url = util.format(template, lId.slice(0, 2), lId.slice(2, 4), lId.slice(4, 6), lId.slice(6, 8), lId);
        var path = sails.config.appPath + "/public/ico/" + item.slug + ".png";

        File.download(url, path, function (data) {
          item.image = "/media/ico/" + item.slug + ".png";

          item.save(function (err) {
            if (err) return res.json(400, err);
            return cb(null, item);
          })
        });

      }, function (err, result) {
        if (err) return res.json(400, {});
        return res.json(result)
      })

    }).catch(function (err) {
      return res.json(400, err)
    });


  }

};

