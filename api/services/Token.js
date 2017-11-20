var
  jwt = require('jsonwebtoken'),
  tokenSecret = "X$fkcV$zBvTd`4+}(tT*![B/(S^mL{{A";

// Generates a token from supplied payload
module.exports.issue = function (payload, expiresIn) {
  var expiresIn = expiresIn || 180 * 60;
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn: expiresIn // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verify = function (token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};
