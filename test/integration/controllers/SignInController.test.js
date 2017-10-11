var request = require('supertest');
var expect = require('expect.js');

var validUserData = {
  email: 'kloniys@gmail.com',
  password: 'test',
  confirmPassword: "test"
}

describe('SignInController', function () {

  describe('#index()', function () {
    it('should create and login user', function (done) {
      request(sails.hooks.http.app)
        .post('/signup')
        .send(validUserData)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          request(sails.hooks.http.app)
            .post('/signin')
            .send(validUserData)
            .end(function (err, res) {
            if (err) return done(err);
            console.log(res.body)
            done();
          });

        });
    });
  });
});
