/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  resetPasswordRequest: function (req, res) {

    return res.json({});
  },
  resetPassword: function (req, res) {

    return res.json({
      user: {},
      token: {}
    });
  }

};

