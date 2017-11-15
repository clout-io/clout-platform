/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var cryptoRandomString = require('crypto-random-string');
const ogs = require('open-graph-scraper');
const textParser = require("npm-text-parser");
const _ = require("underscore");


function buildPostTags(post, cb) {
  var tags = textParser.getHashtags(post.text);
  var find = [];
  var parsedTags = [];

  tags.forEach(function (tag) {
    tag = tag.toLowerCase().replace("#", "").trim();
    find.push({
      name: tag,
      id: tag
    });
    parsedTags.push(tag)
  });

  var tagsToAdd = _.difference(parsedTags, post.displayTags);
  var tagsToRemove = _.difference(post.displayTags, parsedTags);

  if (tagsToAdd.length === 0 && tagsToRemove.length === 0) {
    return cb()
  }

  Post.findOne(post.id).then(function (post) {

    if (!find.length) {
      post.tags.remove(tagsToRemove);
      post.displayTags = [];
      post.save(function (err) {
        if (err) return cb(err);
        cb();
      })
    } else {
      Tag.findOrCreate(find, find).then(function (result) {
        post.text = textParser.parseHashtags(post.text);

        post.tags.remove(tagsToRemove);
        post.tags.add(tagsToAdd);

        post.displayTags = parsedTags;
        post.save(function (err) {
          if (err) return cb(err);
          cb();
        })

      });
    }


  })
}

module.exports = {

  attributes: {

    id: {
      type: "string",
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return "post_" + cryptoRandomString(32);
      }
    },
    text: {
      type: "string"
    },
    video: {
      type: "string",
      url: true
    },
    link: {
      type: "string",
      url: true
    },
    linkData: {
      type: "json"
    },
    attachment: {
      collection: "Img"
    },
    owner: {
      model: "user",
      required: true
    },
    clc: {
      type: "integer",
      defaultsTo: 0
    },
    category: {
      model: "Category",
      required: true
    },
    tags: {
      collection: "tag",
      via: "posts",
      dominant: true
    },
    displayTags: {
      type: "array",
      defaultsTo: []
    }
  },

  beforeCreate: function (values, next) {
    if (values.link) {
      var url = values.link;
      const options = {'url': url};
      ogs(options, function (err, results) {
        values.linkData = results.data;
        next()
      });
    } else {
      next()
    }
  },
  beforeValidate: function (values, next) {
    async.waterfall([
      function (cb) {
        if (!values.category) {
          return next({"category": "Invalid category"})
        }
        Category.findOne(values.category).then(function (category) {
          if (!category) {
            cb({"category": "Invalid category"})
          } else {
            cb()
          }
        }).catch(function (err) {
          cb(err)
        });

      }
    ], function (err, result) {
      next(err)
    })


  },

  beforeUpdate: function (values, next) {
    if (values.link) {
      var url = values.link;
      const options = {'url': url};
      ogs(options, function (err, results) {
        values.linkData = results.data;
        next()
      });
    } else {
      next()
    }
  },

  afterCreate: function (post, next) {
    buildPostTags(post, next);
  },
  afterUpdate: function (post, next) {
    buildPostTags(post, next);
  }
}
;

