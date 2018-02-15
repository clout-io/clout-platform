const Joi = require('joi');

module.exports = {
  status: Joi.string().valid(["ongoing", "upcoming", "closed"]),
  categories: Joi.array(),
};
