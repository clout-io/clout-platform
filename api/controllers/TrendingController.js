/**
 * TrendingController
 *
 * @description :: Server-side logic for managing Trendings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');
const extend = require('util')._extend;

module.exports = {
  index: function (req, res) {

    var perPage = req.query.per_page || 20;
    var currentPage = parseInt(req.query.page, 10) || 1;

    var eachPage = Math.round(perPage / 2);
    var userId = req.user.id ? req.user : null;

    var conditions = {};

    async.parallel([
        function (cb) {
          pager.paginate(Press, conditions, currentPage, eachPage, [], 'updatedAt DESC').then(function (records) {
            async.map(records.data,
              function (item, callback) {
                Insights.get(item.id, userId).then(function (data) {
                  extend(item, data);
                  callback(null, item)
                }, function (err) {
                  callback(err);
                })
              },
              function (err, result) {
                records.data = result
                cb(null, records);
              });

          }).catch(function (err) {
            cb(err)
          });
        },
        function (cb) {
          pager.paginate(Post, conditions, currentPage, eachPage, ["owner", "attachment", "category"], 'updatedAt DESC').then(function (records) {
            async.map(records.data,
              function (item, callback) {
                Insights.get(item.id, userId).then(function (data) {
                  extend(item, data);
                  callback(null, item)
                }, function (err) {
                  callback(err);
                })
              },
              function (err, result) {
                records.data = result
                cb(null, records);
              });
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

