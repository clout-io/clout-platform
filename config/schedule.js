/**
 *
 */
module.exports.schedule = {
  tasks: {
    syncAltcoinHystory: {
      cron: "0 */2 * * *",
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
      cron: "0 */1 * * *",
      task: function () {
        CoinMarketCap.getTicker(function (err, data) {
          for (var key in data) {
            Altcoin.updateOrCreate({id: data[key].id}, data[key]).then(function createFindCB(createdOrFoundRecords) {
            });
          }
        })
      }
    }
  }
};
