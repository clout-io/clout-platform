const request = require('request');
module.exports = {
  lookup: async (ip) => {
    return new Promise((resolve, reject) => {
      let url = "http://ip-api.com/json/" + ip;

      request.get({url: url, json: true}, function (e, r, info) {
        if (info)
          resolve(info);
        reject(e);

      })

    })

  }

};
