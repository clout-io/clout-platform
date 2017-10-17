//https://thesabbir.com/how-to-use-json-web-token-authentication-with-sails-js/


var defaultUserErrorMsg = {
  "email": [
    {
      "rule": "email",
      "message": "Value should be an email (instead of null, which is an object)"
    },
    {
      "rule": "required",
      "message": "\"required\" validation rule failed for input: null\nSpecifically, it threw an error.  Details:\n undefined"
    }
  ],
  "password": [
    {
      "rule": "string",
      "message": "Value should be a string (instead of null, which is an object)"
    },
    {
      "rule": "required",
      "message": "\"required\" validation rule failed for input: null\nSpecifically, it threw an error.  Details:\n undefined"
    }
  ]
}

module.exports = {
  /***
   * Authorization: Token [token]
   * @param req
   * @param res
   */
  index: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    Authentication.validate(req.body, function (err, data) {
      if (err) {
        return res.json(err.invalidAttributes)
    }

      User.findOne({email: email}, function (err, user) {
        if (!user) {
          return res.json(401, defaultUserErrorMsg);
        }

        User.comparePassword(password, user, function (err, valid) {
          if (err) {
            return res.json(401, defaultUserErrorMsg);
          }

          if (!valid) {
            return res.json(401, defaultUserErrorMsg);
          }

          if (!user.isActive) {
            return res.json(401, {"non_field_error": "User is not active."})
          }
          return res.json({
            user: user,
            token: Token.issue({id: user.id})
          });
        });
      })
    })
  }
};
