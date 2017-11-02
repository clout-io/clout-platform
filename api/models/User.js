/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
var cryptoRandomString = require('crypto-random-string');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      email: true,
      unique: true,
      required: true
    },
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },
    password: {
      type: 'string',
      required: true
    },
    activationCode: {
      type: 'string',
      defaultsTo: function () {
        return cryptoRandomString(32);
      }
    },
    isActive: {
      type: 'boolean',
      defaultsTo: false
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    socialNetworks: {
      collection: 'SocialNetwork',
      via: 'user'
    },
    uploadedPhoto: {
      collection: 'Img',
      via: 'user'
    },
    followedAltcoins: {
      collection: 'Altcoin',
      via: 'user',
      through: 'follow'

    },
    followedIcos: {
      collection: 'Ico',
      via: 'user',
      through: 'followedico'
    },

    likes: {
      collection: 'like',
      via: 'owner',
      dominant: true
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.activationCode;
      delete obj.confirmPassword;
      return obj;
    },
    getActivateLink: function () {
      return sails.config.appUrl + "/activate" + '?code=' + this.activationCode;
    }
  },
  beforeCreate: function (values, next) {
    delete values.confirmPassword;
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) return next(err);
        values.password = hash;
        next();
      })
    })
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {

      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }

}
;

