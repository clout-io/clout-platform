module.exports = {
  login: async (req, res) => {
    if (req.method.toUpperCase() === "GET") {
      return res.view();
    }

    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email: email});
    let canLogin = await User.checkPassword(password, user);

    if (!canLogin)
      return res.json(401, Errors.build({}, Errors.ERROR_AUTH_VALIDATION));

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
  }
};
