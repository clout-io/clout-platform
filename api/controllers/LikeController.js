/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');

module.exports = {
  index: function (req, res) {
    var objectId = req.param("objectId");
    var userId = req.user.id;


    async.parallel([
      function (callback) {
        Altcoin.findOne(objectId).exec(function (err, result) {
          callback(err, result)
        });
      },
      function (callback) {
        Ico.findOne(objectId).exec(function (err, result) {
          callback(err, result)
        });
      },
      function (callback) {
        Comment.findOne(objectId).exec(function (err, result) {
          callback(err, result)
        });
      },
      function (callback) {
        Post.findOne(objectId).exec(function (err, result) {
          callback(err, result)
        });
      }
    ], function (err, results) {
      if (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      }

      var objectIsExist = results.some(function (element, index, array) {
        return !util.isNullOrUndefined(element);
      });

      if (!objectIsExist) return res.json(404, Errors.build({"message": "object not found."}, Errors.ERROR_NOT_FOUND));

      Likes.give(userId, objectId).then(function (data) {
        return res.json(data);
      }, function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })

    });


  }
};

