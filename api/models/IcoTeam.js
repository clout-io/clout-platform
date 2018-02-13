/**
 * IcoTeam.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    role: {type: "string"},
    name: {type: "string", unique: true},
    link: {type: "string"},
    status: {type: "string"},
    order: {type: "integer"}
  }
};

