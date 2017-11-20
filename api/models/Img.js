/**
 * Img.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var cryptoRandomString = require('crypto-random-string');

module.exports = {

  attributes: {
    id: {
      type: "string",
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return "img_" + cryptoRandomString(32);
      }
    },
    name: {
      type: "string",
      unique: true,
      defaultsTo: function () {
        return cryptoRandomString(16);
      }
    },
    path: {
      type: "string",
      required: true
    },
    user: {
      model: "user",
      required: true
    },
    size: {
      type: "integer",
      required: true
    },
    url: {
      type: "string",
      defaultsTo: function () {
        return "/image"
      }
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.path;
      return obj;
    }
  },
  beforeCreate: function (values, cb) {
    var ext = values.path.split(".")[1];
    values.name = values.name + "." + ext;
    values.url = values.url + "/" + values.name;
    cb();
  }

};

