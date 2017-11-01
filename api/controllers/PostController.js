/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');
const extend = require('util')._extend;

module.exports = {

  index: function (req, res) {
    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;
    var conditions = {};
    var userId = null;

    if (req.user) {
      userId = req.user.id
    }

    pager.paginate(
      Post, conditions, currentPage, perPage, ["owner", "attachment"], 'createdAt DESC')
      .then(function (records) {
        async.map(records.data,
          function (item, cb) {
            Insights.get(item.id, userId).then(function (data) {
              extend(item, data);
              cb(null, item)
            }, function (err) {
              cb(err);
            })
          },
          function (err, result) {
            if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            records.data = result;
            return res.json(records);
          });
      }).catch(function (err) {
      return res.json(400, err)
    });
  },
  create: function (req, res) {

    var data = req.body;
    data.owner = req.user.id;

    Post.create(data).then(function (post) {
      return res.json(post)
    }).catch(function (err) {
      return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
    })
  }

};

