/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const util = require('util');
const striptags = require('striptags');
const extend = require('util')._extend;

module.exports = {
  create: function (req, res) {
    var objectId = req.param("objectId");
    var userId = req.user.id;
    var text = req.body.text;

    text = striptags(text);

    var isComment = false;
    var rootNode = null;

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
          if (result) {
            isComment = true;
            rootNode = result.root
          }
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

      var createData = {
        objectId: objectId,
        owner: userId,
        text: text
      };
      if (!rootNode) {
        rootNode = objectId
      }

      if (isComment) {
        createData.parent = objectId;
        createData.root = rootNode;
      } else {
        createData.root = objectId;
      }

      Comment.create(createData).then(function (comment) {
        Comment.count(
          {root: rootNode}
        ).then(function (count) {
          return res.json(
            {comment: comment, count: count}
          )
        }).catch(function (err) {
          return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        })
      }).catch(function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })
    });
  },


  list: function (req, res) {
    var objectId = req.param("objectId");

    var ownerCriteria = {select: ['id', 'email']};

    var userId = null;
    if (req.user) {
      userId = req.user.id;
    }

    function _getChildren(searchComment, done) {
      try {
        var resCmd = searchComment;
        Insights.get(resCmd.id, userId).then(function (data) {
          extend(resCmd, data);
          Comment.find({parent: resCmd.id}).populate('owner', ownerCriteria).sort('updatedAt DESC').exec(function (err, childINodes) {
            if (err) {
              return done(err);
            }
            resCmd.child = childINodes;
            async.each(resCmd.child, function (childINode, next) {
              if (err) {
                return next(err);
              }
              childINode.child = [];
              _getChildren(childINode, function (err, childNodes) {
                if (err) {
                  return next(err);
                }
                childINode.child.concat(childNodes);
                return next();
              });
            }, function afterCheckingEachChildINode(err) {
              if (err) {
                return done(err);
              }
              return done(undefined, resCmd);
            });
          });
        }, function (err) {
          return done(err);
        })
      } catch (e) {
        return done(e);
      }
    }

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

      var objectIsExist = results.some(function (element, index, array) {
        return !util.isNullOrUndefined(element);
      });

      if (!objectIsExist) return res.json(404, Errors.build({"message": "object not found."}, Errors.ERROR_NOT_FOUND));

      Comment.find({objectId: objectId}).populate('owner', ownerCriteria).sort('updatedAt DESC').then(function (comments) {
        var finalResult = [];
        async.each(comments, function (comment, nextParent) {
          _getChildren(comment, function afterwards(err, result) {
            if (err) {
              return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            }
            finalResult.push(result);
            nextParent()
          });
        }, function afterCheckingEachChildINode(err) {
          return res.json(finalResult)
        });


      }).catch(function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })

    });
  }
};

