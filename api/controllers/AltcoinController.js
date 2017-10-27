/**
 * AltcoinController
 *
 * @description :: Server-side logic for managing altcoins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');

module.exports = {

  index: function (req, res) {

    var perPage = req.query.per_page || 20;
    var currentPage = req.query.page || 1;
    var conditions = {};
    pager.paginate(Altcoin, conditions, currentPage, perPage, [], 'rank ASC').then(function (records) {
      res.json(records)
    }).catch(function (err) {
      res.send(err)
    });
  },

  info: function (req, res) {
    var name = req.param("name");

    async.parallel(
      [function (callback) {
        Altcoin.findOne({id: name}).populate('priceHistory', {sort: 'timestamp ASC'}).then(function (altcoin) {
          callback(null, altcoin);
        }).catch(function (error) {
          callback(error);
        })

      },
        function (callback) {
          Like.count({objectId: name}).populateAll().then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          Comment.count({root: name}).then(function (count) {
            callback(null, count);
          }).catch(function (error) {
            callback(error);
          })
        },
        function (callback) {
          if (!req.user) {
            callback(null, false);
          } else {
            Like.count({objectId: name, owner: req.user.id}).then(function (count) {
              callback(null, count > 0);
            }).catch(function (error) {
              callback(error);
            })
          }
        }
      ],
      function (err, result) {
        if (err) res.json(400, Errors.build(err, Errors.ERROR_UNKNOWN));
        var altcoin = result[0];
        var count = result[1];
        var comments = result[2];
        var isLiked = result[3];
        altcoin.likes = count || 0;
        altcoin.comments = comments || 0;
        altcoin.isLiked = isLiked;
        res.json(altcoin);
      }
    )
  },

  sync: function (req, res) {
    CoinMarketCap.getTicker(function (err, data) {
      for (var key in data) {
        Altcoin.findOrCreate({id: data[key].id}, data[key]).exec(
          function createFindCB(error, createdOrFoundRecords) {
          });
      }
      return res.json(data)

    })
  }
};

