var sails = require('sails');
var async = require('async');

before(function (done) {
  this.timeout(15000);
  // db.createUser({user:"clout_test_user", pwd:"12345", roles: [ { role: "readWrite", db: "clout_test_db" } ]})
  sails.lift({
    connections: {
      cloutMongodbServer: {
        adapter: 'sails-mongo',
        host: 'localhost',
        port: 27017,
        user: 'clout_test_user', //optional
        password: '12345', //optional
        database: 'clout_test_db' //optional

      }
    },
    models: {migrate: 'drop'}

  }, function (err) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function (done) {
  sails.lower(done);
});

beforeEach(function (done) {
  var destroyFuncs = [];
  for (var modelName in sails.models) {
    destroyFuncs.push(function (callback) {
      sails.models[modelName].destroy({})
        .exec(function (err) {
          callback(null, err)
        });
    })
  }
  async.parallel(destroyFuncs, function (err, results) {
    done(err);
  });
})
