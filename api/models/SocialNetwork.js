/**
 * SocialNetworks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    type: {
      type: 'string',
      enum: ['facebook', 'google']
    },

    socialId: {
      type: 'string',
      unique: true
    },

    socialData: {
      type: "json"
    },

    token: {
      type: 'string'
    },


    user: {
      model: 'user'
    }
  }
};

