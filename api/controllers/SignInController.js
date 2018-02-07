//https://thesabbir.com/how-to-use-json-web-token-authentication-with-sails-js/


const defaultUserErrorMsg = {
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
};

module.exports = {
  /***
   * Authorization: Token [token]
   * @param req
   * @param res
   */
  index: async (req, res) => {
    let email = req.param('email');
    let password = req.param('password');


    try {
      await async function validate() {
        return new Promise((resolve, reject) => {
          Authentication.validate(req.body, (err, data) => {
            if (err) reject(err);
            resolve(data)
          })
        });
      }()
    } catch (e) {
      return res.json(400, Errors.build(e.invalidAttributes, Errors.ERROR_VALIDATION))
    }

    let user = await User.findOne({email: email, isActive: true}).populate("roles");


    if (!user) {
      return res.json(401, Errors.build(defaultUserErrorMsg, Errors.ERROR_VALIDATION));
    }

    let isValid = await User.checkPassword(password, user);

    if (!isValid) {
      return res.json(401, Errors.build(defaultUserErrorMsg, Errors.ERROR_VALIDATION)
      );
    }

    let updatedUser, token;
    [updatedUser, token] = await Token.generate(user, req);

    return res.json({
      user: updatedUser,
      token: token
    });
  }
};
