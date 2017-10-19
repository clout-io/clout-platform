var ERROR_USER_IS_NOT_ACTIVE = module.exports.ERROR_USER_IS_NOT_ACTIVE = "user_is_not_active";
var ERROR_USER_NOT_FOUND = module.exports.ERROR_USER_NOT_FOUND = "user_not_found";
var ERROR_AUTH_VALIDATION = module.exports.ERROR_AUTH_VALIDATION = "auth_validation_error";
var ERROR_REGISTER_VALIDATION = module.exports.ERROR_REGISTER_VALIDATION = "refister_validation_error";
var ERROR_SOCIAL_FACEBOOK_AUTH = module.exports.ERROR_SOCIAL_FACEBOOK_AUTH = "fb_social_error";
var ERROR_UNKNOWN = module.exports.ERROR_UNKNOWN = "error_unknown";
var ERROR_VALIDATION = module.exports.ERROR_VALIDATION = "validation_error";
var errors = {};
errors[ERROR_UNKNOWN] = 600;
errors[ERROR_USER_IS_NOT_ACTIVE] = 601;
errors[ERROR_USER_NOT_FOUND] = 602;
errors[ERROR_AUTH_VALIDATION] = 603;
errors[ERROR_REGISTER_VALIDATION] = 604;
errors[ERROR_SOCIAL_FACEBOOK_AUTH] = 605;
errors[ERROR_VALIDATION] = 610;




module.exports.build = function (body, codeType) {
  var code = codeType || ERROR_UNKNOWN;
  var errorCode = errors[code];
  return {
    "error": {
      "code": errorCode,
      "body": body
    }
  }
};
