/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      email: true,
      unique: true,
      required: true,
      createOnly: true
    },
    firstName: {
      type: 'string',
      defaultsTo: '',
      editable: true,
      createOnly: true
    },
    lastName: {
      type: 'string',
      defaultsTo: '',
      editable: true,
      createOnly: true
    },
    username: {
      type: 'string',
      required: true,
      editable: true,
      unique: true,
      isUsername: true,
      createOnly: true
    },
    slug: {
      type: 'slug',
      from: 'username',
      blacklist: ['search'],
      unique: true,
    },
    avatar: {
      type: 'string',
      url: true
    },
    password: {
      type: 'string',
      required: true,
      createOnly: true
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
    phone: {
      type: "string",
      phone: true,
      editable: true,
    },
    site: {
      type: "string",
      url: true,
      editable: true,
    },
    skype: {
      type: "string",
      editable: true,
    },
    linkedin: {
      type: "string",
      url: true,
      editable: true,
    },
    tweeter: {
      type: "string",
      url: true,
      editable: true,
    },
    facebook: {
      type: "string",
      url: true,
      editable: true,
    },
    country: {
      type: "string",
      editable: true,
    },
    city: {
      type: "string",
      editable: true,
    },
    state: {
      type: "string",
      editable: true,
    },
    street: {
      type: "string",
      editable: true,
    },
    suite: {
      type: "string",
      editable: true,
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
      let obj = this.toObject();
      delete obj.password;
      delete obj.slug;
      delete obj.activationCode;
      delete obj.confirmPassword;
      delete obj.email;
      delete obj.isAdmin;

      obj.name = obj.firstName + " " + obj.lastName;
      if (_.isEmpty(obj.name.trim())) {
        obj.name = "@" + obj.username;
      }
      return obj;
    },
    getActivateLink: function () {
      return sails.config.appUrl + "/activate" + '?code=' + this.activationCode;
    },
    getResetPasswordLink: function () {
      let token = Token.issue({id: this.id}, '5m');
      return {
        url: sails.config.appUrl + "/reset" + '?code=' + token,
        token: token
      }
    }
  },
  types: {
    editable: (value) => {
      return true;
    },
    createOnly: (value) => {
      return true;
    },
    isUsername: (value) => {
      return !_.isEmpty(value) && value.match(/^[A-z0-9]+(?:-[A-z0-9]+)*$/);
    },
    phone: function (value) {
      return value.match(/\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/i)
    },
    password: function (value) {
      return _.isString(value) && value.length >= 6 && value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g);
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
  comparePassword: async (password, user, cb) => {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  },
  checkPassword: async (password, user) => {
    return new Promise((resolve) => {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) resolve(false);
        if (match) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  },
  passwordHash: async (password) => {
    return new Promise((resolve) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw(err);
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw(err);
          resolve(hash)
        })
      })
    })
  }
};

