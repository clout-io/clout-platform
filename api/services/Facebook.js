const graph = require('fbgraph');


const userAccess = [
  "public_profile",
  "email"
];


module.exports.authUrl = function () {

  return graph.getOauthUrl({
    "client_id": sails.config.socialNetworks.facebook.appId,
    "scope": userAccess.join(",")
  });
};

module.exports.confirm = function (code, redirectUri) {
  let queryParams = {
    client_id: sails.config.socialNetworks.facebook.appId,
    redirect_uri: redirectUri,
    client_secret: sails.config.socialNetworks.facebook.appSecret,
    code: code
  };

  return new Promise(function (resolve, reject) {
    graph.authorize(queryParams, function (err, facebookRes) {
      if (err) reject(err.message);
      resolve(facebookRes)
    });
  });
};

module.exports.profile = function (token) {
  return new Promise(function (resolve, reject) {
    graph.setAccessToken(token);
    graph.get("me?fields=id,name,email,picture.type(large)", function (err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });


};
