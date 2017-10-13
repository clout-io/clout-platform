/**
 * Created by jaumard on 27/02/2015.
 */

var async = require('async');

module.exports.schedule = {
  sailsInContext: true, //If sails is not as global and you want to have it in your task
  tasks: {
    syncAltcoins: {
      cron: "0 */1 * * *",
      task: function (context, sails) {
        CoinMarketCap.getTicker(function (err, data) {
          var callFunctions = [];
          data.map(function (item) {
            callFunctions.push(
              function () {
                item.id = item.id.toLowerCase();
                Altcoin.findOrCreate({id: item.id}, item).exec(function createFindCB(err, createdOrFoundRecords) {
                });
              }
            )
          });
          async.parallel(callFunctions, function (err, results) {
            console.log("complete")
          });
        })
      },
      context: {}
    },
    syncAltcoinHistory: {
      cron: "0 1 */1 * *",
      task: function (context, sails) {
        Altcoin.find().exec(function (err, data) {
          var callFunctions = [];
          data.map(function (item) {
            callFunctions.push(
              function () {
                var toDate = new Date();
                var fromDate = new Date();
                fromDate.setDate(toDate.getDate() - 1);

                CoinMarketCap.getHistory(item.id, fromDate.getTime(), toDate.getTime()).then(function (historyData) {
                  for (var key in historyData.price_usd) {
                    AltcoinPrice.create({
                      altcoin: item.id,
                      timestamp: historyData.price_usd[key][0],
                      price_usd: historyData.price_usd[key][1],
                      volume_usd: historyData.volume_usd[key][1],
                      price_btc: historyData.price_btc[key][1]
                    }).exec(function (err, price) {
                    });
                  }
                });

              }
            )
          });
          async.parallel(callFunctions, function (err, results) {
          });


        })


      },
      context: {}
    }
  }
};
