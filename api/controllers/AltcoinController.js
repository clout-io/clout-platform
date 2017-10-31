/**
 * AltcoinController
 *
 * @description :: Server-side logic for managing altcoins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');

module.exports = {

  index: function (req, res) {

    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;


    async.waterfall([
        function (callback) {
          if (req.user) {
            User.findOne(req.user.id).populate('followedAltcoins').then(function (user) {
              async.map(user.followedAltcoins, function (item, callback) {
                callback(null, item.id)
              }, function (err, results) {
                var data = {
                  ids: results,
                  items: user.followedAltcoins
                };
                callback(null, data);
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
        var conditions = {};

        if (result.ids) {
          conditions.id = {"!": result.ids}
        }

        pager.paginate(Altcoin, conditions, currentPage, perPage, []).then(function (records) {

          var resultData = records;
          if (currentPage === 1 && result.items) {
            resultData.data = result.items.concat(resultData.data)
          }
          res.json(resultData)
        }).catch(function (err) {
          res.send(err)
        });

      }
    );


  },

  info: function (req, res) {
    var id = req.param("name");

    async.parallel(
      [function (callback) {
        Altcoin.findOne({id: id}).populate('priceHistory', {sort: 'timestamp ASC'}).then(function (altcoin) {
          callback(null, altcoin);
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
        if (err) res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        var altcoin = result[0];
        if (!altcoin) return res.json(404, Errors.build(err, Errors.ERROR_NOT_FOUND));
        var count = result[1];
        var comments = result[2];
        var isLiked = result[3];
        var votes = result[4];
        var voted = result[5];
        altcoin.likes = count || 0;
        altcoin.comments = comments || 0;
        altcoin.isLiked = isLiked;
        altcoin.votes = votes;
        altcoin.voted = voted;
        res.json(altcoin);
      }
    )
  },

  sync: function (req, res) {
    CoinMarketCap.getTicker(function (err, data) {
      for (var key in data) {
        Altcoin.findOrCreate({id: data[key].id}, data[key]).exec(
          function createFindCB(error, createdOrFoundRecords) {
          });
      }
      return res.json(data)

    })
  },

  follow: function (req, res) {
    var userId = req.user.id;
    var altcoinId = req.param("id");
    var data = {altcoin: altcoinId, user: userId};
    Altcoin.findOne(altcoinId).then(function (altcoin) {
      if (!altcoin) return res.json(404, Errors.build({}, Errors.ERROR_NOT_FOUND));


      Follow.findOne(data).then(function (followed) {
        if (!followed) {
          Follow.create(data).then(function (followed) {
            return res.json(followed);
          }).catch(function (err) {
            return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
          })
        } else {
          Follow.destroy(followed.id).then(function () {
            return res.json({});
          }).catch(function (err) {
            return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
          })
        }

      }).catch(function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })
    }).catch(function (err) {
      if (err) res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
    });


  }
};

