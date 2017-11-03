module.exports = {

  calc: function (objectId) {
    function process(resolve, reject) {
      Insights.get(objectId).then(function (data) {
        Comment.findOne(objectId).then(function (comment) {
          var clc = data.likes + data.votes.upvote - data.votes.downvote;

          if (comment) {
            Comment.count({parent: objectId}).then(function (count) {
              clc += count;
              resolve({clc: clc});
            }).catch(function (err) {
              reject(err);
            });

          } else {
            clc += data.comments;
            resolve({clc: clc});
          }
        }).catch(function (error) {
          reject(error);
        })


      }, function (err) {
        resolve(err);
      });

    }

    return new Promise(process)
  }

};
