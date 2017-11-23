/**
 * SocialController
 *
 * @description :: Server-side logic for managing socials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  facebookUrl: function (req, res) {
    /***
     * return facebook auth url, need add redirect_uri
     */
    res.json(200, {"url": Facebook.authUrl()})
  },

  facebookMobileAuth: function (req, res) {
    var accessToken = req.param("accessToken");
    var email = req.param("email");

    if (!accessToken) {
      return res.json(400, Errors.build({
        "accessToken": {
          "rule": "required",
          "message": "\"required\" validation rule failed for input: null\nSpecifically, it threw an error.  Details:\n undefined"
        }
      }, Errors.ERROR_VALIDATION));
    }

    async.waterfall([
      function (cb) {
        Facebook.profile(accessToken).then(function (result) {
          cb(null, result)
        }, function (err) {
          cb(err)
        })
      },
      function (profileData, cb) {
        email = profileData.email || email;
        User.updateOrCreate({email: email}, {
          email: email,
          avatar: profileData.picture.data.url,
          username: profileData.name
        }).then(function (user) {
          cb(null, profileData, user);
        }).catch(function (err) {
          cb(err)
        })
      },
      function (profileData, user, cb) {
        var socialId = profileData.id;
        SocialNetwork.updateOrCreate({socialId: socialId, user: user.id}, {
          socialId: socialId,
          user: user.id,
          socialData: profileData,
          type: "facebook",
          token: accessToken
        }).then(function (social) {
          cb(null, social);
        }).catch(function (err) {
          cb(err);
        })

      }
    ], function (err, result) {
      if (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_VALIDATION));
      }
      return res.json({
        user: result.user,
        token: Token.issue({id: result.user.id})
      })
    });

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


    if (!redirectUri) {
      return res.json(400, Errors.build({
        "redirectUri": {
          "rule": "required",
          "message": "\"required\" validation rule failed for input: null\nSpecifically, it threw an error.  Details:\n undefined"
        }
      }, Errors.ERROR_VALIDATION));
    }


    async.waterfall([
      function (cb) {
        Facebook.confirm(code, redirectUri).then(function (result) {
          cb(null, result)
        }, function (err) {
          cb(err)
        })
      },
      function (response, cb) {
        var token = response.access_token;
        Facebook.profile(token).then(function (result) {
          cb(null, response, result)
        }, function (err) {
          cb(err)
        })

      },
      function (response, profileData, cb) {
        email = profileData.email || email;
        User.updateOrCreate({email: email}, {
          email: email,
          avatar: profileData.picture.data.url,
          username: profileData.name
        }).then(function (user) {
          cb(null, response, profileData, user);
        }).catch(function (err) {
          cb(err)
        })
      },
      function (response, profileData, user, cb) {
        var socialId = profileData.id;
        var token = response.access_token;
        SocialNetwork.updateOrCreate({socialId: socialId, user: user.id}, {
          socialId: socialId,
          user: user.id,
          socialData: profileData,
          type: "facebook",
          token: token
        }).then(function (social) {
          social.user = user;
          cb(null, social);
        }).catch(function (err) {
          cb(err);
        })

      }
    ], function (err, result) {
      if (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_VALIDATION));
      }
      return res.json({
        user: result.user,
        token: Token.issue({id: result.user.id})
      })
    });
  }

};

