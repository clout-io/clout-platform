/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
  resetPasswordRequest: function (req, res) {
    var email = req.param('email');

    User.findOne({email: email}).then(function (user) {

      if (user) {
        SendGrid.send(
          user.email,
          sails.config.mail.resetPassword.subject,
          sails.config.mail.resetPassword.adminEmail,
          "Reset password link " + user.getResetPasswordLink().url
        );
        return res.json({});
      } else {
        return res.json({});
      }


    }).catch(function (err) {
      return res.json(400, err);
    });
  },
  resetPassword: function (req, res) {

    var token = req.param("code");
    var password = req.body.password;
    if (password !== req.body.confirmPassword) {
      return res.json(400, Errors.build({"non_field_error": 'Password doesn\'t match!'}, Errors.ERROR_REGISTER_VALIDATION));
    }

    var result = User.types.password(password);
    if (!result) {
      return res.json(400, Errors.build({"non_field_error": 'Invalid password!'}, Errors.ERROR_REGISTER_VALIDATION));
    }

    Token.verify(token, function (err, decoded) {
      if (err) return res.json(400, {"non_field_error": "Code is expired"})
      User.findOne(decoded.id).then(function (user) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) return next(err);
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            user.save(function (err) {
              if (err) return res.json(400, Errors.build(err.message, Errors.ERROR_VALIDATION)
              );
              var token = Token.issue({id: user.id});
              return res.json({
                user: user,
                token: token
              });
            })
          })
        })
      }).catch(function (err) {
        return res.json(400, Errors.build(err.message, Errors.ERROR_VALIDATION));
      })
    });


  }

};

