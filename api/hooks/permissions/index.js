const _ = require('underscore');
module.exports = function cronHook(sails) {

  return {
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        let roleAdmin = 'Admin';
        let roleUser = 'User';

        PermissionService.createRole({name: 'Admin'});
        PermissionService.createRole({name: 'User'});

        let userDefaultAccessModels = {
          'altcoin': ['read'],
          'category': ['read'],
          'comment': ['read', 'create', 'update', 'delete'],
          'follow': ['read', 'create', 'update', 'delete'],
          'followedico': ['read', 'create', 'update', 'delete'],
          'ico': ['read'],
          'icocategory': ['read'],
          'icoindustry': ['read'],
          'icosocial': ['read'],
          'icostage': ['read'],
          'icoteam': ['read'],
          'icotokentechnology': ['read'],
          'icotokentype': ['read'],
          'img': ['read', 'create'],
          'like': ['read', 'create', 'update', 'delete'],
          'post': ['read', 'create', 'update', 'delete'],
          'press': ['read', 'create', 'update', 'delete'],
          'rss': ['read'],
          'tag': ['read'],
          'url': [],
          'user': ['read', 'create', 'update', 'delete'],
          'useractivity': ['read',],
          'vote': ['read', 'create', 'update', 'delete'],
        };


        let create = [];
        Object.keys(sails.models).map(function (model) {
          create.push(function (callback) {
            Model.findOrCreate({name: model}, {name: model, identity: model}).then(function (err, data) {
              PermissionService.grant(
                {role: roleAdmin, model: model, action: 'read'}
              );
              PermissionService.grant(
                {role: roleAdmin, model: model, action: 'create'}
              );
              PermissionService.grant(
                {role: roleAdmin, model: model, action: 'update'}
              );
              PermissionService.grant(
                {role: roleAdmin, model: model, action: 'delete'}
              );
              Object.keys(userDefaultAccessModels).map(function (modelName) {
                userDefaultAccessModels[modelName].map(function (item) {
                  PermissionService.grant(
                    {role: roleUser, model: modelName, action: item}
                  );

                })
              });
              callback();
            })
          })
        });
        async.parallel(create, function (err, results) {
          cb();
        });
      });
    }
  }
};
