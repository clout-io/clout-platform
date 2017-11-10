/**
 *
 */

var moment = require('moment');
var async = require('async');

module.exports.schedule = {
  tasks: {
    syncAltcoinHystory: {
      cron: "*/1 * * * *",
      name: "syncAltcoinHystory",
      task: function (job, done) {
        var start = moment();
        sails.log.debug("Start: syncAltcoinHystory");
        Altcoin.findOne({history_sync: {not: true}}).exec(function (err, altcoin) {
          if (err) return err;
          sails.log.debug("Query complete in:", (moment() - start) / 1000, "->", altcoin.id);
          CoinMarketCap.getHistory(altcoin.id).then(function (info) {

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
              sails.log.debug("syncAltcoinHystory complete in:", (moment() - start) / 1000);
              done()
            })
          })
        })
      }
    },
    syncAltcoin: {
      cron: "*/2 * * * *",
      name: "syncAltcoin",
      task: function (job, done) {
        var date = moment().utc().clone();
        var midnight = date.valueOf().toString();
        var start = moment();
        sails.log.debug("Start: syncAltcoin");

        Altcoin.find().sort("updatedAt ASC").limit(50).then(function (altcoins) {
          async.map(altcoins, function (item, cb) {
            CoinMarketCap.getSingleTicker(item.id).then(function (info) {
              info = info[0];
              item.price_btc = info.price_btc;
              item.price_usd = info.price_usd;
              item["24h_volume_usd"] = info["24h_volume_usd"];
              item.market_cap_usd = info.market_cap_usd;
              item.available_supply = info.available_supply;
              item.total_supply = info.total_supply;
              item.percent_change_1h = info.percent_change_1h;
              item.percent_change_24h = info.percent_change_24h;
              item.percent_change_7d = info.percent_change_7d;
              item.save(function (err) {
                if (err) cb(err);
                AltcoinPrice.updateOrCreate({timestamp: midnight, altcoin: item.id}, {
                  altcoin: item.id,
                  timestamp: midnight,
                  price_btc: item.price_btc,
                  price_usd: item.price_usd,
                  market_cap_by_available_supply: item.market_cap_usd,
                  "24h_volume_usd": item["24h_volume_usd"]
                }).then(function (rdata) {
                  cb(null, item.id)
                });
              })
            }, function (err) {
              cb(null, "Not found: " + item.id);
            })
          }, function (err, result) {
            sails.log.debug("syncAltcoin complete in:", (moment() - start) / 1000);
            done();
            return result;
          })
        }).catch(function (err) {
          console.log(err);
          done();
        })
      }
    }
  }
};
