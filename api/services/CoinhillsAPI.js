var apiUrl = "https://www.coinhills.com/api/private/ico.php?type=%s&rows=10000&page=1";
const request = require('request');
const util = require('util');

module.exports.getICOs = function (type) {
  var type = type || "ongoing";
  var url = util.format(apiUrl, type);
  return new Promise(function (resolve, reject) {
    request.get(url, function (e, r, body) {
      if (e) return reject(e);
      var jsData = JSON.parse(body);
      return resolve(jsData)
    })
  });

};
