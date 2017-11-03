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
    var currentPage = parseInt(req.query.page, 10) || 1;

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

        pager.paginate(Altcoin, conditions, currentPage, perPage, [], 'rank ASC').then(function (records) {

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
    var objectId = req.param("name");

    async.parallel(
      [function (callback) {
        Altcoin.findOne({id: objectId}).populate('priceHistory', {sort: 'timestamp ASC'}).then(function (altcoin) {
          callback(null, altcoin);
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
            Follow.count({altcoin: objectId, user: req.user.id}).then(function (count) {
              callback(null, count > 0)
            })
          } else {
            callback(null, false);
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
        var isFollow = result[6] || false;
        altcoin.likes = count || 0;
        altcoin.comments = comments || 0;
        altcoin.isLiked = isLiked;
        altcoin.votes = votes;
        altcoin.voted = voted;
        altcoin.isFollow = isFollow;
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


};

