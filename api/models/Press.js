/**
 * Press.js
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
        return "press_" + cryptoRandomString(32);
      },
    },

    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    pubDate: {
      type: "datetime"
    },
    image: {
      type: "string",
      url: true
    },
    link: {
      type: "string",
      url: true
    },
    guid: {
      type: "string"
    },
    rss: {
      model: "RSS"
    }
  }
};

