var request = require('supertest');


describe('IcoController', function () {
  describe('#index()', function () {
    it('return 200', function (done) {
      request(sails.hooks.http.app)
        .get('/api/v1/icos')
        .expect(200).end(function (err, data) {
          console.log(data.body);
          done()
      })
    })
  })
});
