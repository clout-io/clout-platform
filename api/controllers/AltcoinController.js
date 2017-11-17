/**
 * AltcoinController
 *
 * @description :: Server-side logic for managing altcoins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');
var moment = require('moment');
var async = require('async');

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
  favorites: function (req, res) {
    var userId = req.user.id;

    User.findOne(userId).populate("followedAltcoins").then(
      function (user) {
        if (!user) {
          return res.json(204, []);
        }
        return res.json(user.followedAltcoins);
      }
    )
  },

  top: function (req, res) {
    var limit = req.param("top") || 10;
    Altcoin.find().sort("rank ASC").limit(limit).then(function (result) {
      res.json({data: result});
    }).catch(function (err) {
      res.json(400, err)
    })
  },

  search: function (req, res) {
    var term = req.param('term');
    Altcoin.find({id: {contains: term}, select: ['id']}).then(
      function (data) {
        data = _.map(data, function (item) {
          return item.id
        });
        res.json(data);
      }
    ).catch(function (err) {
      res.json(400, err);
    })
  },

  sync: function (req, res) {
    var moment = require('moment');
    var mmtMidnight = moment().clone().startOf('day');
    var midnight = mmtMidnight.valueOf();
    sails.log.debug("Start fetch data");

    CoinMarketCap.getTicker().then(function (data) {
      async.map(data, function (item, cb) {
        Altcoin.updateOrCreate({id: item.id}, item).then(function createFindCB(createdOrFoundRecords) {
          cb(null, item.id)
        });

      }, function (err, result) {
        res.json(result)
        console.log(err)
      });
    }, function (err) {
      return res.json(400, err)
    });

    // var mmtMidnight = moment().utc().clone();
    // var midnight = mmtMidnight.valueOf().toString();
    // console.log(midnight)
    //
    //
    // Altcoin.find().sort("updatedAt ASC").limit(50).then(function (altcoins) {
    //   async.map(altcoins, function (item, cb) {
    //     CoinMarketCap.getSingleTicker(item.id).then(function (info) {
    //       info = info[0];
    //       item.price_btc = info.price_btc;
    //       item.price_usd = info.price_usd;
    //       item["24h_volume_usd"] = item["info.24h_volume_usd"];
    //       item.market_cap_usd = info.market_cap_usd;
    //       item.available_supply = info.available_supply;
    //       item.total_supply = info.total_supply;
    //       item.percent_change_1h = info.percent_change_1h;
    //       item.percent_change_24h = info.percent_change_24h;
    //       item.percent_change_7d = info.percent_change_7d;
    //       item.save(function (err) {
    //         if (err) cb(err);
    //         AltcoinPrice.updateOrCreate({timestamp: midnight, altcoin: item.id}, {
    //           altcoin: item.id,
    //           timestamp: midnight,
    //           price_btc: item.price_btc,
    //           price_usd: item.price_usd,
    //           market_cap_by_available_supply: item.total_supply,
    //           "24h_volume_usd": item["24h_volume_usd"]
    //         }).then(function (rdata) {
    //           cb(null, item.id)
    //         });
    //       })
    //     }, function (err) {
    //       cb(null, err);
    //     })
    //   }, function (err, result) {
    //     if (err) return res.json(400, err);
    //     return res.json(result)
    //   })
    // }).catch(function (err) {
    //   console.log(err)
    //   return res.json(400, err)
    // })
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

                altcoin.image = "/media/altcoin/" + altcoin.id + "." + ext;

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


  },

  syncHistory: function (req, res) {


    var start = moment();
    Altcoin.findOne({history_sync: {not: true}}).exec(function (err, altcoin) {
      if (err) return err;
      CoinMarketCap.getHistory(altcoin.id).then(function (info) {
        sails.log.debug("Query complete in:", (moment() - start) / 1000, "->", altcoin.id);
        async.mapValues(info.price_usd, function (data, key, cb) {
          AltcoinPrice.findOrCreate({
            altcoin: altcoin.id,
            timestamp: data[0],
          }, {
            altcoin: altcoin.id,
            timestamp: data[0],
            price_usd: data[1],
            volume_usd: info.volume_usd[key][1],
            price_btc: info.price_btc[key][1],
            market_cap_by_available_supply: info.market_cap_by_available_supply[key][1]
          }).exec(function createFindCB(error, createdOrFoundRecords) {
            cb(null, altcoin.id)
          });
        }, function (err, result) {
          altcoin.history_sync = true;
          altcoin.save();
          sails.log.debug("Sync complete in:", (moment() - start) / 1000);
          return res.json(result);
        })
      })
    })
  }


};

