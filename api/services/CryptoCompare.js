var apiUrl = "https://www.cryptocompare.com/api/data/coinlist/";
const request = require('request');

module.exports = {
  coinList: function () {
    return new Promise(function (resolve, reject) {
      request.get({url: apiUrl}, function (e, r, body) {
        if (e) return reject(e);
        if (r.statusCode === 200) {
          var jsData = JSON.parse(body);
          return resolve(jsData)
        }
        return reject(body)
      })
    })
  }
};
