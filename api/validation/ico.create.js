const Joi = require('joi');
const CountryList = require('country-list');

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


const teamObjectSchema = Joi.object({
  role: Joi.string().min(1).max(80).trim().required(),
  name: Joi.string().min(1).max(80).trim().required(),
  link: Joi.string().uri().min(1).max(40).trim().required(),
  order: Joi.number().integer().required(),
  status: Joi.string().valid(["active", "inactive"]),
  isDeleted: Joi.boolean()
}).required();


const teamArraySchema = Joi.array().items(teamObjectSchema).min(1).unique();

const socialObjectSchema = Joi.object({
  type: Joi.string().min(1).max(80).trim().required(),
  link: Joi.string().uri().min(1).max(40).trim().required(),
}).required();


const socialArraySchema = Joi.array().items(socialObjectSchema).min(1).unique();


module.exports = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid(Object.keys(ICO_STATUS)),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  image: Joi.string().required(),
  hypeScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  riskScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  investScore: Joi.string().valid(Object.keys(SCORE_LEVEL)),
  categories: Joi.array().items(Joi.string()).required(),
  founded: Joi.number().integer().min(2000).max(new Date().getFullYear()),
  site: Joi.string(),
  blog: Joi.string(),
  whitepaper: Joi.string(),

  primaryGeography: Joi.string().valid(Object.keys(CountryList().getCodeList())).required(),
  projectStage: Joi.string(), //projectStage list
  features: Joi.string(),


  tokenType: Joi.string(),//need token types
  tokenTechnology: Joi.string(), //need token tech

  amount: Joi.number().integer().min(1).required(),
  jurisdiction: Joi.string().required(Object.keys(CountryList().getCodeList())),

  tokensDistribution: Joi.string(),
  tokenSales: Joi.string(),
  accepts: Joi.string(),

  technicalDetails: Joi.string(),
  sourceCode: Joi.string(),
  proofOfDeveloper: Joi.string(),

  industry: Joi.string(),

  team: Joi.alternatives().try(teamObjectSchema, teamArraySchema),
  socials: Joi.alternatives().try(socialObjectSchema, socialArraySchema)
};
