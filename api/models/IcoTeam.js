/**
 * IcoTeam.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    position: {type: "string"},
    name: {type: "string"},
    toString:function () {
      return this.name;
    }
  }
};

