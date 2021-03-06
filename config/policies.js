/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  '*': ['isAuthorized', 'PermissionPolicy'],
  SignInController: {
    index: true
  },
  SocialController: {
    facebookAuth: true,
    facebookUrl: true,
    facebookMobileAuth: true
  },

  SignUpController: {
    index: true,
    activate: true
  },
  AltcoinController: {
    index: true,
    favorites: true,
    alphabetList: true,
    sync: true,
    history: true,
    info: true,
    top: true,
    syncPhoto: true,
    syncHistory: true
  },
  IcoController: {
    index: true,
    info: true,
    top: true,
    alphabetList: true,
    sync: true,
    syncPhoto: true
  },
  SwaggerController: {
    '*': true
  },
  AdminController: {
    login: true
  },
  CommentController: {
    list: true
  },
  ImgController: {
    getPhoto: true,
    getIcoPhoto:
      true
  },
  PostController: {
    index: true,
    single: true
  },
  UserController: {
    resetPasswordRequest: true,
    resetPassword: true,
    profile: true
  },
  PressController: {
    index: true,
    sync: true
  },
  CategoryController: {
    index: true
  },
  TagController: {
    search: true
  },
  UrlController: {
    ogInfo: true,
    redirect: true
  },
  TrendingController: {
    index: true
  },
  IcoIndustryController: {
    list: true,
  },
  IcoTokenTechnologyController: {
    list: true,
  },
  IcoTokenTypeController: {
    list: true,
  },
  IcoStageController: {
    list: true,
  },
  IcoCategoryController: {
    list: true,
  },
  CountryController: {
    list: true
  }

};
