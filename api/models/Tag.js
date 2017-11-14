/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true
    },
    posts: {
      collection: 'post',
      via: 'tags'
    }
  },
  beforeValidate: function (values, next) {
    next()
  },
  afterValidate: function (values, next) {
    values.id = values.name.toLowerCase();
    next();
  }
};

