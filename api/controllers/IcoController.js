/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');

module.exports = {

  index: function (req, res) {
    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;
    var conditions = {};
    pager.paginate(Ico, conditions, currentPage, perPage, ["socials", "team"], 'name ASC').then(function (records) {
      res.json(records)
    }).catch(function (err) {
      res.send(err)
    });
  },

  info: function (req, res) {
    var id = req.param("id");

    async.parallel(
      [function (callback) {
        Ico.findOne({id: id}).populateAll().then(function (ico) {
          callback(null, ico);
        }).catch(function (error) {
          callback(error);
        })

      },
        function (callback) {
          Like.count({objectId: id}).populateAll().then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          Comment.count({root: id}).then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Like.count({objectId: id, owner: req.user.id}).then(function (count) {
              callback(null, count > 0);
            }).catch(function (error) {
              callback(error);
            })
          }
        },
        function (callback) {
          Votes.count(id).then(function (data) {
            callback(null, data)
          }, function (err) {
            callback(err)
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Vote.findOne({objectId: id, owner: req.user.id}).then(function (vote) {
              if (vote) {
                callback(null, vote.vote);
              } else {
                callback(null, false)
              }
            }).catch(function (error) {
              callback(error);
            })
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
        ico.likes = count || 0;
        ico.comments = comments || 0;
        ico.isLiked = isLiked;
        ico.votes = votes;
        ico.voted = voted;
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
  }

};

