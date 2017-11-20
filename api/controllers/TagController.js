/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require("underscore");

module.exports = {

  search: function (req, res) {

    var term = req.param('term');

    async.parallel([
      function (cb) {
        Altcoin.find({id: {contains: term}, select: ['id']}).then(
          function (data) {
            cb(null, data)
          }
        ).catch(function (err) {
          cb(err);
        })
      },
      function (cb) {
        Tag.find({id: {contains: term}, select: ['id']}).then(
          function (data) {
            cb(null, data)
          }
        ).catch(function (err) {
          cb(err);
        })
      }

    ], function (err, result) {
      var all = _.reduceRight(result, function (a, b) {
        return a.concat(b);
      }, []);
      var all = _.map(all, function (item) {
        return item.id
      });
      var all = _.uniq(all).sort();


      return res.json(all)

    });


  }

};

