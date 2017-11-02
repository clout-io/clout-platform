var request = require('request');
var fs = require('fs');

module.exports = {
  download: function (uri, fileName, done) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
    });
  }
};
