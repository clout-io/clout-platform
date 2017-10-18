/**
 * SocialController
 *
 * @description :: Server-side logic for managing socials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cryptoRandomString = require('crypto-random-string');

module.exports = {

  facebookUrl: function (req, res) {
    /***
     * return facebook auth url, need add redirect_uri
     */
    res.json(200, {"url": Facebook.authUrl()})
  },

  facebookAuth: function (req, res) {
    /***
     * code - facebook code for request a access_token
     * email - set custom email if facebook don't provide it
     * redirectUri - same as in authUrl
     * return user info and token
     */
    var code = req.param("code");
    var redirectUri = req.param("redirectUri");
    var email = req.param("email");

    Facebook.confirm(code, redirectUri, function (err, data) {
      if (err) return res.json(JSON.parse(err));
      var r = JSON.parse(data);
      var token = r.access_token;
      Facebook.profile(token, function (err, profileData) {
        if (err) return res.json(400, Errors.build(JSON.parse(err), Errors.ERROR_SOCIAL_FACEBOOK_AUTH));

        email = profileData.email || email;

        if (!email) {
          return res.json(400, Errors.build({"error": "'email' is required."}, Errors.ERROR_SOCIAL_FACEBOOK_AUTH))
        }

        var socialId = profileData.id;

        SocialNetwork.findOne({socialId: socialId}).populate('user').exec(function (err, social) {
          if (err) return res.json(400, Errors.build(err.invalidAttributes, Errors.ERROR_SOCIAL_FACEBOOK_AUTH));
          if (!social) {
            User.findOne({
              activationCode: req.param("code")
            }).exec(function (err, user) {
              if (err) {
                return res.json(err);
              }
              if (!user) {
                User.create({
                  email: profileData.email,
                  password: cryptoRandomString(16),
                  isActive: true
                }).exec(function (err, user) {
                  if (err) return res.json(400, Errors.build(err.invalidAttributes, Errors.ERROR_SOCIAL_FACEBOOK_AUTH));
                  SocialNetwork.create({
                    socialId: socialId,
                    user: user,
                    socialData: profileData
                  }).exec(function (err, social) {
                    if (err) return res.json(400, Errors.build(err.invalidAttributes, Errors.ERROR_SOCIAL_FACEBOOK_AUTH));
                    return res.json({
                      user: user,
                      token: Token.issue({id: user.id})
                    })
                  })
                });
              }
              SocialNetwork.create({
                socialId: socialId,
                user: user,
                socialData: profileData
              }).exec(function (err, social) {
                if (err) return res.json(400, Errors.build(err.invalidAttributes, Errors.ERROR_SOCIAL_FACEBOOK_AUTH));
                return res.json({
                  user: user,
                  token: Token.issue({id: user.id})
                })
              })
            })
          }
          social.token = token;
          social.socialData = profileData;
          social.save();

          res.json({
            user: social.user,
            token: Token.issue({id: social.user.id})
          })
        });
      });
    });
  }

};

