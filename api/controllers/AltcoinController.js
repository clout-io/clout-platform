/**
 * AltcoinController
 *
 * @description :: Server-side logic for managing altcoins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');
var moment = require('moment');

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

    var mmtMidnight = moment().clone().startOf('day');
    var midnight = mmtMidnight.valueOf();

    CoinMarketCap.getTicker(function (err, data) {
      if (err) res.json(400, err)
      async.map(data, function (item, cb) {
        Altcoin.updateOrCreate({id: item.id}, item).then(function createFindCB(createdOrFoundRecords) {
          AltcoinPrice.updateOrCreate({timestamp: new String(midnight), altcoin: createdOrFoundRecords.id}, {
            altcoin: createdOrFoundRecords.id,
            timestamp: midnight,
            price_btc: item.price_btc,
            price_usd: item.price_usd,
            market_cap_by_available_supply: item.total_supply,
            "24h_volume_usd": item["24h_volume_usd"]
          }).then(function createFindCB(rdata) {

          });
        });

      }, function (err, result) {
        if (err) res.json(400, err);
        res.json(result)
      });
    })
  },
  syncPhoto: function (req, res) {

    async.waterfall([
        function (cb) {
          CryptoCompare.coinList().then(function (data) {
            cb(null, data);
          }, function (err) {
            cb(err);
          });
        },
        function (coins, cb) {
          var coinsData = coins.Data;

          async.map(Object.values(coinsData), function (item, mapCB) {
            var url = "https://www.cryptocompare.com" + item.ImageUrl;
            if (!item.ImageUrl) {
              return mapCB()
            }
            Altcoin.findOne({symbol: item.Symbol}).then(function (altcoin) {
              var ext = item.ImageUrl.split(".")[1];
              var path = sails.config.appPath + "/public/altcoin/" + altcoin.id + "." + ext;

              File.download(url, path, function (data) {

                altcoin.image = "/image/altcoins/" + altcoin.id + "." + ext;

                altcoin.save(function (err) {
                  if (err) return mapCB(err);
                  console.log(item.Symbol.toLowerCase());
                  return mapCB(null, altcoin.id);
                })

              });
            }).catch(function (err) {
              return mapCB(err)
            })
          }, function (err, data) {
            cb(null, data)
          });

        }
      ],
      function (err, data) {
        res.json(data)
      });


  }


};

