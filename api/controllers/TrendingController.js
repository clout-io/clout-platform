/**
 * TrendingController
 *
 * @description :: Server-side logic for managing Trendings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {

    return res.json({
      data: {},
      meta: {
        "page": 1,
        "perPage": 20,
        "previousPage": false,
        "nextPage": 2,
        "pageCount": 64,
        "total": 1266
      }
    });
  }

};

