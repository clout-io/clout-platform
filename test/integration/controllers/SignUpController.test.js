var request = require('supertest');
var expect = require('expect.js');

var validUserData = {
  email: 'kloniys@gmail.com',
  password: 'test',
  confirmPassword: "test"
};

describe('SignUpController', function () {

  describe('#index()', function () {
    it('should create user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/v1/signup')
        .send(validUserData)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  })
  describe('#index()', function () {
    it('should return 400 error when exist user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/v1/signup')
        .send(validUserData)
        .expect(201)
        .end(function (err, res) {
          console.log(res.body)
          if (err) return done(err);
          request(sails.hooks.http.app)
            .post('/api/v1/signup')
            .send(validUserData)
            .expect(400, done)
        });
    });
  });

  describe('#activate()', function () {
    it('should return 200', function (done) {
      User.create(validUserData).exec(function (err, user) {
        request(sails.hooks.http.app)
          .get('/api/v1/activate?code=' + user.activationCode).expect(200).end(
          function (err, res) {
            if (err) return done(err);
            User.findOne({id: user.id}).exec(function (err, user) {
              expect(user.isActive).to.be(true)
              done()
            });
          });
      })
    });
    it('should return 404', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/activate?code=' + "some").expect(404).end(
        function (err, res) {
          if (err) return done(err);
          done()
        });

    });
    it('activate link not empty', function (done) {
      User.create({email: "test@email.com", password: "123"})
        .then(function (user) {
          var link = user.getActivateLink();
          expect(link).to.be.a('string');
          request(sails.hooks.http.app)
            .get("/" + link.split("/")[3]).expect(200).end(
            function (err, res) {
              if (err) return done(err);
              done()
            });


        })
    })
  });

});
