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
      conditions.displayTags = {$in: [tag]}
    }

    if (req.user) {
      userId = req.user.id
    }

    pager.paginate(
      Post, conditions, currentPage, perPage, ["owner", "attachment", "category"], 'updatedAt DESC')
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
  create: async (req, res) => {

    let data = req.body;

    if (!data.type) {
      data.type = Post.TYPE_POST;
    }

    data.owner = req.user.id;

    if (data.type === Post.TYPE_POST) {
      data.text = striptags(data.text);
    }

    try {
      let createdPost = await Post.create(data);
      let post = await Post.findOne(createdPost.id).populateAll();
      return res.json(post)
    } catch (e) {
      return res.json(400, Errors.build(e, Errors.ERROR_UNKNOWN))
    }
  },

  edit: async (req, res) => {
    let postId = req.param("itemId");

    let data = req.body;
    let userId = req.user.id;

    if (!data.type) {
      data.type = Post.TYPE_POST;
    }

    if (data.type === Post.TYPE_POST) {
      data.text = striptags(data.text);
    }

    let post = await Post.findOne({id: postId, owner: userId});
    if (!post) return res.json(404);
    try {
      await Post.update({id: postId, owner: userId}, data);
    } catch (e) {
      res.json(400, Errors.build(e, Errors.ERROR_UNKNOWN));
    }

    let updatedPost = await Post.findOne({id: postId, owner: userId}).populateAll();
    return res.json(updatedPost);

  },
  delete: async (req, res) => {
    let postId = req.param("itemId");
    let userId = req.user.id;
    let criteria = {id: postId, owner: userId};

    let postToDelete = await Post.findOne(criteria);

    if (!postToDelete)
      return res.json(404);

    try {
      await Post.destroy(criteria);
      return res.json(204);
    } catch (e) {
      res.json(400, Errors.build(e, Errors.ERROR_UNKNOWN));
    }
  },

  single: async (req, res) => {
    let postId = req.param("itemId");

    if (!postId) {
      return res.json(404)
    }

    let post = await Post.findOne({id: postId}).populateAll();

    return res.json(post)
  }

};

