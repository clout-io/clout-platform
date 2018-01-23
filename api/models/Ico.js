/**
 * Ico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const slug = require('slug');

const {SCORE_LEVEL, ICO_STATUS, PROJECT_STAGE} = require('../const/ico');

const SCORE_ENUM = Object.keys(SCORE_LEVEL);
const STATUS = Object.keys(ICO_STATUS);
const STAGE = Object.keys(PROJECT_STAGE);
const cryptoRandomString = require('crypto-random-string');

module.exports = {

  attributes: {
    id: {
      type: "string",
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return "ico_" + cryptoRandomString(32);
      }
    },
    name: {
      type: "string"
    },
    slug: {
      type: "string",
      unique: true,
      required: true
    },
    description: {
      type: "string"
    },
    status: {
      type: "string",
      enum: STATUS
    },
    startDate: {
      type: "date"
    },
    endDate: {
      type: "date"
    },
    image: {
      type: "string"
    },
    projectStage: {
      type: "string",
      enum: STAGE
    },
    hypeScore: {
      type: "string",
      enum: SCORE_ENUM
    },
    riskScore: {
      type: "string",
      enum: SCORE_ENUM
    },
    investScore: {
      type: "string",
      enum: SCORE_ENUM
    },
    categories: {
      collection: 'IcoCategory',
      via: 'id'
    },
    founded: {
      type: "string"
    },
    site: {
      type: "string"
    },
    blog: {
      type: "string"
    },
    primaryGeography: {
      type: "string"
    },
    features: {
      type: "string"
    },
    similarProjects: {
      collection: 'Ico',
      via: 'id'
    },
    tokenType: {
      type: "string"
    },
    tokenTechnology: {
      type: "string"
    },
    amount: {
      type: "integer"
    },
    jurisdiction: {
      type: "string"
    },
    tokensDistribution: {
      type: "string"
    },
    tokenSales: {
      type: "string"
    },
    accepts: {
      collection: "Altcoin",
      via: 'id'
    },
    technicalDetails: {
      type: "string"
    },
    sourceCode: {
      type: "string"
    },
    proofOfDeveloper: {
      type: "string"
    },
    team: {
      collection: "IcoTeam",
      via: 'id'
    },
    socials: {
      collection: "IcoSocial",
      via: 'id'
    },
    followByUsers: {
      collection: 'user',
      via: 'altcoin',
      through: 'followedico'
    },
    isPremium: {
      type: "boolean",
      defaultsTo: false
    },
    premiumRank: {
      type: "integer",
      defaultsTo: 0
    },
    premiumDescription: {
      type: "string"
    }
  },
  beforeValidate: function (values, next) {
    if (!values.slug) {
      values.slug = slug(values.name);
    }
    next()
  },
  beforeCreate: function (values, next) {

    next();
  }
};

