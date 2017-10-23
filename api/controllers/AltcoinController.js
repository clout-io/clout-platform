/**
 * AltcoinController
 *
 * @description :: Server-side logic for managing altcoins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    Altcoin.find().sort('rank ASC').exec(function (err, data) {
      if (err) return res.json(err);
      res.json(data)
    })
  },

  info: function (req, res) {
    var name = req.param("name");
    Altcoin.findOne({id: name}).populateAll().exec(function (err, coin) {
      return res.json(coin);
    });
  },

  sync: function (req, res) {
    CoinMarketCap.getTicker(function (err, data) {


      for (var key in data) {
        Altcoin.findOrCreate({id: data[key].id}, data[key]).exec(function createFindCB(error, createdOrFoundRecords) {
        });
      }
      return res.json(data)

    })
  },

  history: function (req, res) {
    Altcoin.find().exec(function (err, data) {
      var callFunctions = [];
      data.map(function (item) {
        CoinMarketCap.getHistory(item.id).then(function (historyData) {
          for (var key in historyData.price_usd) {
            AltcoinPrice.create({
              altcoin: item.id,
              timestamp: historyData.price_usd[key][0],
              price_usd: historyData.price_usd[key][1],
              volume_usd: historyData.volume_usd[key][1],
              price_btc: historyData.price_btc[key][1]
            }).exec(function (err, price) {

            })
          }

        }, function (err) {

        })
      });
      res.send(200);
    })

  }


};

