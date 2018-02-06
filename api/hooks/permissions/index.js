module.exports = function cronHook(sails) {

  return {
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        let create = [];
        Object.keys(sails.models).map(function (model) {
          console.log(model);
          create.push(function (callback) {
            Model.findOrCreate({name: model}, {name: model, identity: model}).then(function (err, data) {
              callback()
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
