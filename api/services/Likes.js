module.exports.give = function (userId, objectId) {


  return new Promise(function (resolve, reject) {
    Like.findOne({owner: userId, objectId: objectId}).exec(function (err, like) {
      if (err) return reject(err);
      if (!like) {
        Like.create({owner: userId, objectId: objectId}).exec(function (err, like) {
          if (err) return reject(err);

          Like.count({objectId: objectId}).exec(function (err, count) {
            if (err) return reject(err);
            return resolve({"success": true, count: count, like: like});
          })
        });
      } else {
        Like.destroy(like.id).exec(function (err) {
          if (err) return reject(err);
          Like.count({objectId: objectId}).exec(function (err, count) {
            if (err) return reject(err);
            return resolve({"success": true, count: count});
          })
        })
      }
    })
  })
};
