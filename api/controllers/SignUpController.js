module.exports = {

  index: async (req, res) => {
    /***
     *
     * @param req
     * @param res
     */

    if (req.method.toUpperCase() !== "POST") {
      return res.send(405)
    }

    try {
      await async function validate() {
        return new Promise((resolve, reject) => {
          SignUp.validate(req.body, (err, data) => {
            if (err) reject(err);
            resolve(data)
          })
        });
      }()
    } catch (e) {
      return res.json(400, Errors.build(e.invalidAttributes, Errors.ERROR_VALIDATION))
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.json(400, Errors.build({"non_field_error": 'Password doesn\'t match!'}, Errors.ERROR_REGISTER_VALIDATION));
    }
    let result = User.types.password(req.body.password);

    if (!result) {
      return res.json(400, Errors.build({"non_field_error": 'Invalid password!'}, Errors.ERROR_REGISTER_VALIDATION));
    }
    let user;

    let allowedFields = _.pick(User.attributes, (value, key, object) => {
      return value.createOnly;
    });
    let allowedKeys = _.keys(allowedFields);

    let body = _.pick(req.body, (value, key) => {
      return _.indexOf(allowedKeys, key) !== -1 && !_.isEmpty(value);
    });

    let name = req.body.name;
    let splitedName = name.split(' ');
    body.firstName = splitedName[0];
    body.lastName = splitedName.splice(1).join(' ').trim();


    try {
      user = await User.create(body);
    } catch (e) {
      return res.json(e.status, Errors.build(e.invalidAttributes, Errors.ERROR_VALIDATION));
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
          user: user,
          token: Token.issue({id: user.id})
        })
      })
    });
  }

}
;
