function getObject(objectId) {

  return new Promise(function (resolve, reject) {
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
        return reject(err);
      }

      var object = null;

      var objectIsExist = results.some(function (element, index, array) {
        if (!util.isNullOrUndefined(element)) {
          object = element;
        }
        return !util.isNullOrUndefined(element)
      });

      if (!objectIsExist) return reject({"message": "object not found."})

      return resolve(object)

    })
  })


}


module.exports.get = function (objectId, userID) {
  return new Promise(function (resolve, reject) {
    async.parallel(
      [function (callback) {
        Like.count({objectId: objectId}).populateAll().then(function (count) {
          callback(null, count);
        }).catch(function (error) {
          callback(error);
        })
      },
        function (callback) {
          Comment.count({root: objectId}).then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          if (!userID) {
            callback(null, false);
          } else {
            Like.count({objectId: objectId, owner: userID}).then(function (count) {
              callback(null, count > 0);
            }).catch(function (error) {
              callback(error);
            })
          }
        },
        function (callback) {
          Votes.count(objectId).then(function (data) {
            callback(null, data)
          }, function (err) {
            callback(err)
          })
        },
        function (callback) {
          if (!userID) {
            callback(null, false);
          } else {
            Vote.findOne({objectId: objectId, owner: userID}).then(function (vote) {
              if (vote) {
                callback(null, vote.vote);
              } else {
                callback(null, false)
              }
            }).catch(function (error) {
              callback(error);
            })
          }
        }
      ],
      function (err, result) {
        if (err) return reject(err);
        var insights = {};
        var count = result[0];
        var comments = result[1];
        var isLiked = result[2];
        var votes = result[3];
        var voted = result[4];
        insights.likes = count || 0;
        insights.comments = comments || 0;
        insights.isLiked = isLiked || false;
        insights.votes = votes || false;
        insights.voted = voted || false;
        resolve(insights);
      }
    )
  })

};
