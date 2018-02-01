const Joi = require('joi');

module.exports = async (data, validator, context = {}) => {
  return Joi.validate(data, validator, {
    allowUnknown: false,
    abortEarly: false,
    convert: true,
    context: context
  }, async (errs) => {
    return new Promise(function (resolve, reject) {
      resolve(errs);
    })
  });
};
