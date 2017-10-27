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

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ***************************************************************************/

  '*': ['isAuthorized'],
  'SignInController': {
    'index': true
  },
  'SocialController': {
    'facebookAuth': true,
    'facebookUrl': true,
    'facebookMobileAuth': true
  },

  'SignUpController': {
    'index': true,
    'activate': true
  },
  'AltcoinController': {
    'index': true,
    'sync': true,//temp
    'history': true,
    'info': true
  },
  'IcoController': {
    'index': true,
    'info': true
  },

  'SwaggerController': {
    '*': true
  },
  'AdminController': {
    'login': true
  },
  'CommentController': {
    'list': true
  }
};
