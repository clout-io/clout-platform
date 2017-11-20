/**
 * Comment.js
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
        return "comment_" + cryptoRandomString(32);
      }
    },
    text: {
      type: "string",
      required: true
    },
    children: {
      collection: 'comment',
      via: 'parent'
    },

    parent: {
      model: "comment",
    },
    objectId: {
      type: "string",
      required: true
    },
    root: {
      type: "string",
      required: true
    },
    owner: {
      model: "user",
      required: true
    },
    clc: {
      type: "integer",
      defaultsTo: 0
    }

  }
};

