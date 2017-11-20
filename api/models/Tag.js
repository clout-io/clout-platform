/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: "string",
      unique: true,
      required: true,
      primaryKey: true
    },
    name: {
      type: "string",
      unique: true,
      required: true
    },
    posts: {
      collection: 'post',
      via: "tags"
    }
  }
};

