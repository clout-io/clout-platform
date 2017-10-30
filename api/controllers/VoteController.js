/**
 * UpvoteController
 *
 * @description :: Server-side logic for managing upvotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');

module.exports = {

  create: function (req, res) {

    var objectId = req.param("objectId");
    var userId = req.user.id;
    var vote = req.body.vote;

    var data = {
      objectId: objectId,
      owner: userId,
      vote: vote
    };


    Vote.validate(data, function (err, data) {
      if (err) return res.json(400, Errors.build(err, Errors.ERROR_VALIDATION));


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

        Votes.give(userId, objectId, vote).then(function (data) {
          return res.json(data);
        }, function (err) {
          return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        })

      });
    });

  }

};

