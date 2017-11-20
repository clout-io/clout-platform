var request = require('supertest');


describe('AltcoinController', function () {
  describe('#index()', function () {
    it('return 200', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/altcoins')
        .expect(200).end(function (err, data) {
          console.log(data.body);
          done()
      })
    })
  })
});
