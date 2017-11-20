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
      var object = null;

      var objectIsExist = results.some(function (element, index, array) {
        if (!util.isNullOrUndefined(element)) {
          object = element;
        }
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

      async.waterfall([
          function (cb) {
            Comment.create(createData).then(function (comment) {
              cb(null, comment);
            }).catch(function (err) {
              cb(err);
            })

          },
          function (comment, cb) {
            CLC.calc(objectId).then(function (result) {
              cb(null, result, comment)
            }).catch(function (err) {
              cb(err);
            })
          },
          function (clcData, comment, cb) {
            extend(object, clcData);
            object.save(function (err) {
              if (err) cb(err);
              cb(null, comment, clcData)
            })

          },
          function (comment, clcData, cb) {
            Comment.count(
              {root: rootNode}
            ).then(function (count) {
              var result = {comment: comment, count: count};
              extend(result, clcData);
              cb(null, result)
            }, function (err) {
              cb(err)
            });
          }
        ],
        function (err, result) {
          if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
          return res.json(result);
        }
      );
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
        async.map(comments, function (comment, cb) {
          _getChildren(comment, function afterwards(err, result) {
            if (err) {
              cb(err)
            }
            cb(null, result)
          });
        }, function afterCheckingEachChildINode(err, result) {
          return res.json(result)
        });
      }).catch(function (err) {
        return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
      })

    });
  }
};

