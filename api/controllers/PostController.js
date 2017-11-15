/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const pager = require('sails-pager');
const extend = require('util')._extend;
const striptags = require('striptags');

module.exports = {

  index: function (req, res) {
    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;
    var category = req.query.category;
    var tag = req.query.tag;
    var conditions = {};

    if (category) conditions.category = category;


    var userId = null;

    if (tag) {
      conditions.displayTags = {contains: tag}
    }

    if (req.user) {
      userId = req.user.id
    }

    pager.paginate(
      Post, conditions, currentPage, perPage, ["owner", "attachment", "category"], 'createdAt DESC')
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

    data.text = striptags(data.text);

    Post.create(data).then(function (post) {
      return res.json(post)
    }).catch(function (err) {
      return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
    })
  },

  edit: function (req, res) {
    var postId = req.param("itemId");

    var data = req.body;
    var userId = req.user.id;

    data.text = striptags(data.text);

    Post.findOne({id: postId, owner: userId}).populate("owner", "attachment").then(function (post) {
      if (!post) return res.json(404);
      Post.update({id: postId, owner: userId}, data).exec(function afterwards(err, updated) {
        if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        Post.findOne({id: postId, owner: userId}).populateAll().then(function (post) {
          return res.json(post);
        });
      })
    }).catch(function (err) {
      return res.json(400, err.errorMessage)
    });
  },
  delete: function (req, res) {
    var postId = req.param("postId");
    var userId = req.user.id;

    Post.findOne({id: postId, owner: userId}).then(function (post) {
      if (!post) return res.json(404);
      Post.destroy({id: postId, owner: userId}).then(function (deletedRecords) {
        return res.json(204, deletedRecords);
      }).catch(function (err) {
        return res.json(400, err)
      });
    })

  }

};

