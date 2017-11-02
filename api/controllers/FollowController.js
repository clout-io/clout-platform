module.exports = {
  index: function (req, res) {
    var userId = req.user.id;
    var objectId = req.param("id");
    var data = {user: userId};


    async.parallel([
      function (cb) {
        Altcoin.findOne(objectId).then(function (altcoin) {
          cb(null, altcoin);
        }).catch(function (err) {
          cb(err);
        });
      },
      function (cb) {
        Ico.findOne(objectId).then(function (ico) {
          cb(null, ico);
        }).catch(function (err) {
          cb(err);
        });
      }
    ], function (err, result) {
      if (err) return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));

      var altcoin = result[0];
      var ico = result[1];

      if (!altcoin && !ico) {
        return res.json(404, Errors.build({"message": "object not found"}, Errors.ERROR_NOT_FOUND));
      }


      if (altcoin) {
        data.altcoin = altcoin.id;
        Follow.findOne(data).then(function (folowedAltcoin) {
          if (!folowedAltcoin) {
            Follow.create(data).then(function (followedIco) {
              return res.json(followedIco);
            }).catch(function (err) {
              return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            })
          } else {
            Follow.destroy(folowedAltcoin.id).then(function () {
              return res.json({});
            }).catch(function (err) {
              return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            })
          }

        }).catch(function (err) {
          return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        })
      }

      if (ico) {
        data.ico = ico.id;
        FollowedIco.findOne(data).then(function (followed) {
          if (!followed) {
            FollowedIco.create(data).then(function (followed) {
              return res.json(followed);
            }).catch(function (err) {
              return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            })
          } else {
            FollowedIco.destroy(followed.id).then(function () {
              return res.json({});
            }).catch(function (err) {

              return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
            })
          }

        }).catch(function (err) {
          return res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        })
      }
    });
  }
};
