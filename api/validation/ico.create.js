const Joi = require('joi');

const {SCORE_LEVEL, ICO_STATUS, PROJECT_STAGE} = require('../const/ico');


const customJoi = Joi.extend((joi) => ({
  base: joi.string(),
  name: 'string',
  language: {
    category: 'Invalid category id {{v}}'
  },
  rules: [
    {
      name: 'category',
      validate(params, value, state, options) {
        let categories = options.context.categories;
        if (categories.indexOf(value) === -1)
          return this.createError('string.category', {v: value, q: params.q}, state, options);
        return value;
      }
    }
  ]
}));


module.exports = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid(Object.keys(ICO_STATUS)),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  image: Joi.string().required(),
  projectStage: Joi.string().valid(Object.keys(PROJECT_STAGE)),
  hypeScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  riskScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  investScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  categories: customJoi.string().required().category(),
  founded: Joi.number().integer().min(2000).max(new Date().getFullYear()),
  primaryGeography: Joi.string().valid(),
  features: Joi.string(),
  tokenType: Joi.string().valid(),
  tokenTechnology: Joi.string().valid(),
  amount: Joi.string().valid(),
  jurisdiction: Joi.string().valid(),
  tokensDistribution: Joi.string().valid(),
  tokenSales: Joi.string().valid(),
  accepts: Joi.string().valid(),
  technicalDetails: Joi.string(),
  sourceCode: Joi.string(),
  proofOfDeveloper: Joi.string(),

};
