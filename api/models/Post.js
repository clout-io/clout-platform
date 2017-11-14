/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var cryptoRandomString = require('crypto-random-string');
const ogs = require('open-graph-scraper');
const textParser = require("npm-text-parser");

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
      via: "posts"
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
        var tags = textParser.getHashtags(values.text);
        if (!tags.length) {
          values.tags = [];
          return cb(null)
        }


        var find = [];
        var parsedTags = [];
        var create = [];

        for (var i in tags) {
          var tag = tags[i];
          tag = tag.toLowerCase().replace("#", "");
          find.push({
            id: tag
          });
          create.push({
            id: tag.toLowerCase(),
            name: tag.toLowerCase()
          });
          parsedTags.push(tag)
        }

        Tag.findOrCreate(find, create).then(function (result) {
          values.tags = parsedTags;
          values.text = textParser.parseHashtags(values.text);
          cb(null)
        })


      },
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
  }
}
;

