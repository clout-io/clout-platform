const Joi = require('joi');

module.exports = {
  sort: Joi.string().required(),
  sortType: Joi.string().valid(["asc", "desc"])
};
