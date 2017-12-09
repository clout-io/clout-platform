//https://thesabbir.com/how-to-use-json-web-token-authentication-with-sails-js/


const moment = require('moment');

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
}

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

    let user = await User.findOne({email: email, isActive: true});


    if (!user) {
      return res.json(401, Errors.build(defaultUserErrorMsg, Errors.ERROR_VALIDATION));
    }

    let isValid = await User.checkPassword(password, user);

    if (!isValid) {
      return res.json(401, Errors.build(defaultUserErrorMsg, Errors.ERROR_VALIDATION)
      );
    }

    let now = moment().utc();
    let ip = req.header('x-real-ip');
    let geo = await IpApi.lookup(ip);
    let agentData = req.header('user-agent');
    let referer = req.header('referer');

    user.lastLogin = now.toDate();
    user.activities.add({
      ip: req.ip,
      ips: req.ips,
      rawInfo: geo,
      agent: agentData,
      referer: referer
    });
    await user.save();

    let token = Token.issue({id: user.id});
    return res.json({
      user: user,
      token: token
    });
  }
};
