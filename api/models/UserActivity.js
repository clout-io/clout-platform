/**
 * UserActivity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const useragent = require("useragent");

module.exports = {

  attributes: {
    user: {
      model: "user",
      required: true
    },
    ip: {
      type: "string",
      ip: true
    },
    ips: {
      type: "array"
    },
    info: {
      type: "string"
    },
    rawInfo: {
      type: "json"
    },
    referer: {
      type: "string"
    },
    agent: {
      type: "string"
    },
    browser: {
      type: "string"
    }
  },
  beforeCreate: function (values, next) {
    let browserInfo = useragent.parse(values.agent);
    values.browser = browserInfo.family;
    values.info = `${values.rawInfo.country},${values.rawInfo.city} Browser: ${values.browser}`;
    next();
  }
};

