/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');

module.exports = {

  index: function (req, res) {
    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;
    var conditions = {};
    pager.paginate(Ico, conditions, currentPage, perPage, [], 'name ASC').then(function (records) {
      res.json(records)
    }).catch(function (err) {
      res.send(err)
    });
  },

  info: function (req, res) {
    var id = req.param("id");

    async.parallel(
      [function (callback) {
        Ico.findOne({id: id}).populateAll().then(function (ico) {
          callback(null, ico);
        }).catch(function (error) {
          callback(error);
        })

      },
        function (callback) {
          Like.count({objectId: id}).populateAll().then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          Comment.count({root: id}).then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Like.count({objectId: id, owner: req.user.id}).then(function (count) {
              callback(null, count > 0);
            }).catch(function (error) {
              callback(error);
            })
          }
        }
      ],
      function (err, result) {
        if (err) res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        var ico = result[0];
        var count = result[1];
        var comments = result[2];
        var isLiked = result[3];
        ico.likes = count || 0;
        ico.comments = comments || 0;
        ico.isLiked = isLiked;
        res.json(ico);
      }
    )


  }

};

