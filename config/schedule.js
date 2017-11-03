/**
 *
 */
module.exports.schedule = {
  tasks: {
    syncAltcoinHystory: {
      cron: "*/2 * * * *",
      task: function () {
        Altcoin.findOne({history_sync: {not: true}}).exec(function (err, altcoin) {
          if (err) return err;
          CoinMarketCap.getHistory(altcoin.id).then(function (data) {
            for (var key in data.price_usd) {
              AltcoinPrice.findOrCreate({
                altcoin: altcoin.id,
                timestamp: data.price_usd[key][0],
              }, {
                altcoin: altcoin.id,
                timestamp: data.price_usd[key][0],
                price_usd: data.price_usd[key][1],
                volume_usd: data.volume_usd[key][1],
                price_btc: data.price_btc[key][1],
                market_cap_by_available_supply: data.market_cap_by_available_supply[key][1]
              }).exec(function createFindCB(error, createdOrFoundRecords) {


              })
            }
            altcoin.history_sync = true;
            altcoin.save();
          })
        })
      }
    },
    syncAltcoin: {
      cron: "*/30 * * * *",
      task: function () {
        var moment = require('moment');
        var mmtMidnight = moment().clone().startOf('day');
        var midnight = mmtMidnight.valueOf();
        sails.log.debug("Start fetch data");

        CoinMarketCap.getTicker(function (err, data) {
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
            console.log(err)
          });
        })
      }
    }
  }
};
