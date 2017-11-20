module.exports = {
  login: function (req, res) {
    if (req.method.toUpperCase() === "GET") {
      return res.view();
    }

    var email = req.body.email;
    var password = req.body.password;

    Authentication.validate(req.body, function (err, data) {
      if (err) {
        return res.json(401, Errors.build(err.invalidAttributes, Errors.ERROR_AUTH_VALIDATION))
      }

      User.findOne({email: email}, function (err, user) {
        if (!user) {
          return res.json(401, Errors.build({}, Errors.ERROR_AUTH_VALIDATION));
        }

        User.comparePassword(password, user, function (err, valid) {
          if (err || !valid) {
            return res.json(
              401,
              Errors.build({}, Errors.ERROR_AUTH_VALIDATION)
            );
          }

          if (!user.isActive) {
            return res.json(
              401,
              Errors.build({"non_field_error": "User is not active."}, Errors.ERROR_USER_IS_NOT_ACTIVE)
            )
          }

          if (!user.isAdmin) {
            return res.json(
              401,
              Errors.build({"non_field_error": "User is not admin."}, Errors.ERROR_USER_IS_NOT_ACTIVE)
            )
          }

          req.session.authenticated = true;
          req.session.user = user;


          return res.redirect("/admin");
        });
      })
    })


  }
};
