/**
 *
 */

var moment = require('moment');

module.exports.schedule = {
  tasks: {
    // syncAltcoinHystory: {
    //   cron: "*/3 * * * *",
    //   task: function () {
    //     Altcoin.findOne({history_sync: {not: true}}).exec(function (err, altcoin) {
    //       if (err) return err;
    //       CoinMarketCap.getHistory(altcoin.id).then(function (data) {
    //         for (var key in data.price_usd) {
    //           AltcoinPrice.findOrCreate({
    //             altcoin: altcoin.id,
    //             timestamp: data.price_usd[key][0],
    //           }, {
    //             altcoin: altcoin.id,
    //             timestamp: data.price_usd[key][0],
    //             price_usd: data.price_usd[key][1],
    //             volume_usd: data.volume_usd[key][1],
    //             price_btc: data.price_btc[key][1],
    //             market_cap_by_available_supply: data.market_cap_by_available_supply[key][1]
    //           }).exec(function createFindCB(error, createdOrFoundRecords) {
    //
    //
    //           })
    //         }
    //         altcoin.history_sync = true;
    //         altcoin.save();
    //       })
    //     })
    //   }
    // },
    syncAltcoin: {
      cron: "*/2 * * * *",
      task: function () {
        var date = moment().utc().clone();
        var midnight = date.valueOf().toString();


        Altcoin.find().sort("updatedAt ASC").limit(30).then(function (altcoins) {
          async.map(altcoins, function (item, cb) {
            CoinMarketCap.getSingleTicker(item.id).then(function (info) {
              info = info[0];
              item.price_btc = info.price_btc;
              item.price_usd = info.price_usd;
              item["24h_volume_usd"] = item["info.24h_volume_usd"];
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
                  market_cap_by_available_supply: item.total_supply,
                  "24h_volume_usd": item["24h_volume_usd"]
                }).then(function (rdata) {
                  cb(null, item.id)
                });
              })
            }, function (err) {
              cb(null, err);
            })
          }, function (err, result) {
            sails.log(result)
            return result;
          })
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
};
