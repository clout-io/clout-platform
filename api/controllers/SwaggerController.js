'use strict';

/**
 * This is a temp fix while one sails 11.x
 * @see https://github.com/tjwebb/sails-swagger/issues/3
 */
var _ = require('lodash');
var _super = require('sails-swagger/dist/api/controllers/SwaggerController');

_.merge(exports, _super);
_.merge(exports, {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
});
