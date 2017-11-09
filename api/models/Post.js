/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var cryptoRandomString = require('crypto-random-string');
const ogs = require('open-graph-scraper');

module.exports = {

  attributes: {

    id: {
      type: "string",
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return "post_" + cryptoRandomString(32);
      }
    },
    text: {
      type: "string"
    },
    video: {
      type: "string",
      url: true
    },
    link: {
      type: "string",
      url: true
    },
    linkData: {
      type: "json"
    },
    attachment: {
      collection: "Img"
    },
    owner: {
      model: "user",
      required: true
    },
    clc: {
      type: "integer",
      defaultsTo: 0
    }
  },

  beforeCreate: function (values, next) {
    if (values.link) {
      var url = values.link;
      const options = {'url': url};
      ogs(options, function (err, results) {
        values.linkData = results.data;
        next()
      });
    } else {
      next()
    }
  },

  beforeUpdate: function (values, next) {
    if (values.link) {
      var url = values.link;
      const options = {'url': url};
      ogs(options, function (err, results) {
        values.linkData = results.data;
        next()
      });
    } else {
      next()
    }
  }
};

