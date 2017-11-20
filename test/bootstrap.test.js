var sails = require('sails');
var async = require('async');

before(function (done) {
  this.timeout(5000);
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
  var destroy = [];
  Object.keys(sails.models).map(function (model) {
    destroy.push(function (callback) {
      sails.models[model].destroy({})
        .exec(function (err, data) {
          callback(null, err)
        });
    })
  });
  async.parallel(destroy, function (err, results) {
    done(err);
  });
});
