const Joi = require('joi');

module.exports = async (data, validator) => {
  return Joi.validate(data, validator, {
    allowUnknown: false,
    abortEarly: false,
    convert: true,
  }, async (errs) => {
    return new Promise(function (resolve, reject) {
      resolve(errs);
    })
  });
};
