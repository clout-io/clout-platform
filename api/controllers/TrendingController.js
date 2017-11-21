/**
 * TrendingController
 *
 * @description :: Server-side logic for managing Trendings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');

module.exports = {
  index: function (req, res) {

    var perPage = req.query.per_page || 20;
    var currentPage = parseInt(req.query.page, 10) || 1;

    var eachPage = Math.round(perPage / 2) ;

    var conditions = {};

    async.parallel([
        function (cb) {
          pager.paginate(Press, conditions, currentPage, eachPage, [], 'updatedAt DESC').then(function (records) {
            cb(null, records);
          }).catch(function (err) {
            cb(err)
          });
        },
        function (cb) {
          pager.paginate(Post, conditions, currentPage, eachPage, ["owner", "attachment", "category"], 'updatedAt DESC').then(function (records) {
            cb(null, records);
          }).catch(function (err) {
            cb(err)
          });
        }
      ],
      function (err, result) {
        var press = result[0] || {};
        var posts = result[1] || {};

        var pressData = press.data;
        var postData = posts.data;

        var treadingData = pressData.concat(postData);

        var typed = _.map(treadingData, function (item) {
          item.type = item.id.split("_")[0];
          return item;
        });

        var sorted = _.sortBy(typed, function (item) {
          return item.updatedAt;
        }).reverse();

        return res.json({
          data: sorted,
          meta: {
            "page": currentPage,
            "perPage": perPage,
            "previousPage": press.meta.previousPage || posts.meta.previousPage,
            "nextPage": press.meta.nextPage || posts.meta.nextPage,
            "pageCount": Math.round((press.meta.pageCount + posts.meta.pageCount) / 2),
            "total": press.meta.total + posts.meta.total
          }
        });

      });


  }

};

