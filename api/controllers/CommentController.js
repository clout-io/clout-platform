/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const util = require('util');
const striptags = require('striptags');
const extend = require('util')._extend;

let getAndUpdateParentComment = async (comment, list = []) => {
  if (!comment.parent)
    return list;

  let parentComment = await Comment.findOne(comment.parent);
  await parentComment.save();

  list.push(parentComment);
  return await getAndUpdateParentComment(parentComment, list)
};

module.exports = {
  create: async (req, res) => {
    let objectId = req.param("objectId");
    let userId = req.user.id;
    let text = req.body.text;

    text = striptags(text);

    let isComment = (ObjectFactory.getObjectType(objectId) === ObjectFactory.TYPE_COMMENT);
    let rootNode = null;


    let object = await ObjectFactory.getObject(objectId);
    if (!object) {
      return res.json(404, Errors.build({"message": "object not found."}, Errors.ERROR_NOT_FOUND));
    }

    let createData = {
      objectId: objectId,
      owner: userId,
      text: text
    };

    if (isComment) {
      rootNode = object.root;
      createData.parent = objectId;
      createData.root = rootNode;
    } else {
      createData.root = objectId;
      rootNode = objectId
    }

    let comment = await Comment.create(createData);
    let clcData = await CLC.calc(objectId);
    extend(object, clcData);
    await object.save();
    let count = await Comment.count({root: rootNode});
    let rootObject = await ObjectFactory.getObject(createData.root);
    await rootObject.save();

    let result = {comment: comment, count: count};
    extend(result, clcData);
    await getAndUpdateParentComment(comment);
    return res.json(result);
  },


  list: function (req, res) {
    var objectId = req.param("objectId");

    var ownerCriteria = {select: ['id', 'avatar', 'username']};

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
      },
      function (callback) {
        Press.findOne(objectId).exec(function (err, result) {
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

