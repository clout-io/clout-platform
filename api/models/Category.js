/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var slug = require('slug')

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true
    },
    posts: {
      collection: 'Post',
      via: 'category'
    }
  },
  beforeCreate: function (values, next) {
    values.id = slug(values.name.toLowerCase(), "_");
    next();
  }

};

