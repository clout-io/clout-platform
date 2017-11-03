/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');
const util = require('util');

module.exports = {

  index: function (req, res) {
    var perPage = req.query.per_page || 20;
    var currentPage = parseInt(req.query.page, 10) || 1;

    async.waterfall([
        function (callback) {
          if (req.user) {
            User.findOne(req.user.id).populate('followedIcos', {select: "id"}).then(function (user) {
              async.map(user.followedIcos, function (item, callback) {
                callback(null, item.id)
              }, function (err, results) {

                Ico.find({id: results}).populateAll().then(function (icos) {
                  var data = {
                    ids: results,
                    items: icos
                  };
                  callback(null, data);
                }).catch(function (err) {
                  callback(err)
                })
              });

            }).catch(function (err) {
              callback(err)
            })
          } else {
            callback(null, {})
          }
        }
      ],

      function (err, result) {
        if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        var conditions = {};
        if (result.ids) {
          conditions.id = {"!": result.ids}
        }

        pager.paginate(Ico, conditions, currentPage, perPage, ["socials", "team"], 'name ASC').then(function (records) {
          var resultData = records;
          if (currentPage === 1 && result.items) {
            resultData.data = result.items.concat(resultData.data)
          }
          res.json(resultData)
        }).catch(function (err) {
          res.send(err)
        });
      })
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


  },
  sync: function (req, res) {
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
  },

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
          item.image = "/image/ico/" + item.slug + ".png";

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

