/**
 * Upvote.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const cryptoRandomString = require('crypto-random-string');

module.exports = {

  attributes: {
    id: {
      type: "string",
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return "vote_" + cryptoRandomString(32);
      }
    },
    objectId: {
      type: "string",
      required: true
    },
    owner: {
      model: "user",
      required: true
    },
    vote: {
      type: "string",
      required: true,
      enum: ["+", "-"]
    }

  }
};

