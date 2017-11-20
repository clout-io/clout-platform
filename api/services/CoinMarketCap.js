const util = require('util');
const request = require('request');

const apiUrl = "https://api.coinmarketcap.com";
const apiVersion = "/v1";
const tickerUrl = "/ticker";

const graphUrl = "https://graphs.coinmarketcap.com/currencies";

//https://www.npmjs.com/package/sails-hook-schedule

module.exports.getTicker = function (callback) {

  return new Promise(function (resolve, reject) {
    var url = util.format("%s%s%s", apiUrl, apiVersion, tickerUrl);
    request.get(url, function (e, r, body) {
      if (e) return reject(e);
      if (r.statusCode === 200) {
        var jsData = JSON.parse(body);
        return resolve(jsData)
      }
      return reject(body)
    })
  })
};

module.exports.getSingleTicker = function (coin) {
  return new Promise(function (resolve, reject) {
    var url = util.format("%s%s%s/%s", apiUrl, apiVersion, tickerUrl, coin);
    request.get(url, function (e, r, body) {
      if (e) return reject(e);
      if (r.statusCode === 200) {
        var jsData = JSON.parse(body);
        return resolve(jsData)
      }
      return reject(body)
    })
  })

};


module.exports.getHistory = function (id, from, to) {
  var url = util.format("%s/%s", graphUrl, id);

  if (from && to) {
    url = util.format("%s/%s/%s", url, from, to)
  }
  return new Promise(function (resolve, reject) {
    request.get({url: url, /*proxy: 'http://37.143.96.236:8080'*/}, function (e, r, body) {
      if (e) {
        return reject(e);
      }

      if (r.statusCode === 200) {
        var jsData = JSON.parse(body);
        return resolve(jsData)
      }
      return reject(body)
    })
  })
};
