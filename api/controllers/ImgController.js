/**
 * ImgController
 *
 * @description :: Server-side logic for managing imgs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const SkipperDisk = require('skipper-disk');

module.exports = {

  getPhoto: function (req, res) {
    var imageId = req.param("imgName");
    req.validate({
      imgName: 'string'
    });

    Img.findOne(
      {name: imageId}
    ).then(function (img) {
      var fileAdapter = SkipperDisk();
      res.set("Content-Type", img.type);
      fileAdapter.read(img.path)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);
    }).catch(function (err) {
      return res.notFound();
    })
  },


  upload: function (req, res) {
    var userId = req.user.id;

    var pathPies = [];
    var pathStr = userId;
    while (pathStr.length) {
      pathPies.push(pathStr.substr(0, 2));
      pathStr = pathStr.substr(2);
    }

    var path = pathPies.join("/");

    async.waterfall([
      function (callback) {
        req.file("img").upload({
          dirname: require('path').resolve(sails.config.appPath, "public/images/" + path)
        }, function (err, uploadedFiles) {
          if (err) return callback(uploadedFiles);
          return callback(null, uploadedFiles);
        });
      },
      function (uploadedFiles, callback) {
        async.map(uploadedFiles, function (file, cb) {
          Img.create({user: userId, path: file.fd, size: file.size, type: file.type}).then(function (created) {
            cb(null, created)
          }).catch(function (err) {
            cb(err)
          })
        }, function (err, result) {
          callback(null, result)
        });


      }
    ], function (err, result) {
      return res.json(result)
    })


  }

};

