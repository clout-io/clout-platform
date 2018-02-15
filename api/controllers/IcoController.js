/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');
const slug = require('slug');
const util = require('util');
const Promise = require('bluebird');
const IcoFilterValidation = require('../validation/ico.filters');
const IcoSortValidation = require('../validation/ico.sort');
const IcoCreateValidation = require('../validation/ico.create');
const Validate = require('../validation/validator');
const joiErrorsToForms = require('joi-errors-for-forms').form();

module.exports = {

  create: async function (req, res) {

    let result = await IcoCategory.find();
    let categories = result.map(x => x.id);

    let validateResult = await Validate(req.body, IcoCreateValidation, {categories: categories});

    let ValidateResult = joiErrorsToForms(validateResult);

    if (ValidateResult) {
      return res.status(400).json(ValidateResult)
    }

    if (req.body.categories) {
      req.body.categories = await Promise.map(req.body.categories, async (item) => {
        let category = await IcoCategory.findOne({id: slug(item).toLowerCase()});
        if (!category) {
          category = await IcoCategory.create({"name": item})
        }
        return category;
      });
    }

    if (req.body.projectStage) {
      let stage = await IcoStage.findOne({id: slug(req.body.projectStage).toLowerCase()});
      if (!stage) {
        stage = await IcoStage.create({"name": req.body.projectStage})
      }
      req.body.projectStage = stage;
    }

    if (req.body.tokenTechnology) {
      let tokenTech = await IcoTokenTechnology.findOne({id: slug(req.body.tokenTechnology).toLowerCase()});
      if (!tokenTech) {
        tokenTech = await IcoTokenTechnology.create({"name": req.body.tokenTechnology})
      }
      req.body.tokenTechnology = tokenTech;
    }

    if (req.body.tokenType) {
      let tokenType = await IcoTokenType.findOne({id: slug(req.body.tokenType).toLowerCase()});
      if (!tokenType) {
        tokenType = await IcoTokenType.create({"name": req.body.tokenType})
      }
      req.body.tokenType = tokenType;
    }

    try {
      let ico = await Ico.create(req.body);
      ico = await Ico.findOne(ico.id).populate(["socials", "team", "categories", "image"]);
      return res.json(ico);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  index: async function (req, res) {
    const perPage = req.query.per_page || 20;
    const sort = req.query.sort || "name";
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

    let sorting = {isPremium: -1, premiumRank: 1,};
    sorting[sort] = sortType === 'desc' ? -1 : 1;

    let conditions = {sort: sorting};
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

      followedIco = await Ico.find(userCondition).populate(["socials", "team", "image"]);
    }
    let resultData = {};
    console.log(conditions);

    if(conditions.categories){
      conditions.categoriesList = conditions.categories;
      delete conditions.categories;
    }
    try {
      resultData = await pager.paginate(Ico, conditions, currentPage, perPage, ["socials", "team", "image"]);
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

  info: async function (req, res) {
    let idOrSlug = req.param("id");
    let ico = await Ico.findOne({
        or: [{id: idOrSlug}, {slug: idOrSlug}]
      }
    ).populateAll();

    let objectId = ico.id;


    if (!ico) return res.json(404, Errors.build({}, Errors.ERROR_NOT_FOUND));

    let count = await Like.count({objectId: objectId}).populateAll();
    let comments = await Comment.count({root: objectId});

    let isLiked = false;
    let voted = false;
    let isFollow = false;
    if (req.user) {
      isLiked = await Like.count({objectId: objectId, owner: req.user.id});
      voted = await Vote.findOne({objectId: objectId, owner: req.user.id});
      isFollow = await FollowedIco.count({ico: objectId, user: req.user.id});
    }

    let votes = await Votes.count(objectId);
    ico.likes = count || 0;
    ico.comments = comments || 0;
    ico.isLiked = isLiked;
    ico.votes = votes;
    ico.voted = voted;
    ico.isFollow = isFollow;
    return res.json(ico);
  },


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
          item.outImage = "/media/ico/" + item.slug + ".png";

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

