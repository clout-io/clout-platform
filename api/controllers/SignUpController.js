module.exports = {

  index: function (req, res) {
    /***
     *
     * @param req
     * @param res
     */
    if (req.method.toUpperCase() !== "POST") {
      return res.send(405)
    }

    SignUp.validate(req.body, function (err, data) {
      if (err) {
        return res.json(400, Errors.build(err.invalidAttributes, Errors.ERROR_VALIDATION))
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.json(400, Errors.build({"non_field_error": 'Password doesn\'t match!'}, Errors.ERROR_REGISTER_VALIDATION));
      }
      User.create(req.body).exec(function (err, user) {
        if (err) {
          return res.json(err.status, Errors.build(err.invalidAttributes, Errors.ERROR_VALIDATION));
        }
        if (user) {
          SendGrid.send(
            user.email,
            sails.config.mail.activate.subject,
            sails.config.mail.activate.adminEmail,
            "Please confirm your email " + user.getActivateLink()
          );
          res.json(201, {
            user: user.toJSON()
          });
        }
      });
    })
  },

  activate: function (req, res) {
    User.findOne({
      activationCode: req.param("code"),
      isActive: false
    }).exec(function (err, user) {
      if (err) {
        return res.send(404);
      }
      if (!user) {
        return res.send(404);
      }
      user.isActive = true;
      user.activationCode = "";
      user.save(function (err) {
        if (err) {
          res.json(err.status, {err: err});
        }
        res.json(200, {
          "isActive": user.isActive,
          token: Token.issue({id: user.id})
        })
      })
    });
  }

};
