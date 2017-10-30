function voteCount(objectId) {
  return new Promise(function (resolve, reject) {
    async.parallel([
      function (callback) {
        Vote.count({objectId: objectId, vote: "+"}).then(function (count) {
          callback(null, count);
        }).catch(function (err) {
          callback(err);
        })
      },
      function (callback) {
        Vote.count({objectId: objectId, vote: "-"}).then(function (count) {
          callback(null, count);
        }).catch(function (err) {
          callback(err);
        })
      }
    ], function (err, result) {
      if (err) return reject(err);
      var up = result[0] || 0;
      var down = result[1] || 0;
      return resolve({"success": true, upvote: up, downvote: down});
    })
  })
}


module.exports.give = function (userId, objectId, inputVote) {


  return new Promise(function (resolve, reject) {
    Vote.findOne({owner: userId, objectId: objectId}).then(function (vote) {
      if (!vote) {
        Vote.create({owner: userId, objectId: objectId, vote: inputVote}).then(function (vote) {
          voteCount(objectId).then(function (data) {
            return resolve(data);
          }, function (err) {
            return reject(err);
          })
        }).catch(function (err) {
          return reject(err);
        });
      } else {
        if (vote.vote === inputVote) {
          Vote.destroy(vote.id).exec(function (err) {
            if (err) return reject(err);
            voteCount(objectId).then(function (data) {
              return resolve(data);
            }, function (err) {
              return reject(err);
            })
          })
        } else {
          vote.vote = inputVote;
          vote.save(function (err) {
            if (err) return reject(err);
            voteCount(objectId).then(function (data) {
              return resolve(data);
            }, function (err) {
              return reject(err);
            })
          })
        }
      }
    }).catch(function (err) {
      return reject(err);
    })
  })
};
