/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');
const extend = require('util')._extend;

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
      var object = null;
      var objectIsExist = results.some(function (element, index, array) {
        if (!util.isNullOrUndefined(element)) {
          object = element;
        }
        return !util.isNullOrUndefined(element);
      });

      if (!objectIsExist) return res.json(404, Errors.build({"message": "object not found."}, Errors.ERROR_NOT_FOUND));

      async.waterfall([
          function (cb) {
            Likes.give(userId, objectId).then(function (data) {
              cb(null, data);
            }, function (err) {
              cb(err)
            })

          },
          function (likeData, cb) {
            CLC.calc(objectId).then(function (clcData) {
              cb(null, clcData, likeData)
            }).catch(function (err) {
              cb(err);
            })
          },
          function (clcData, likeData, cb) {
            extend(object, clcData);
            extend(likeData, clcData);
            object.save(function (err) {
              if (err) cb(err);
              cb(null, likeData)
            })

          }
        ],
        function (err, result) {
          if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
          return res.json(result);
        }
      );
    });


  }
};

