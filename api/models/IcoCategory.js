/**
 * IcoCategories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const slug = require('slug');

module.exports = {

  attributes: {
    name: {
      type: "string"
    }

  },
  beforeValidate: function (values, next) {
    values.id = slug(values.name).toLowerCase();
    next();
  },

};

