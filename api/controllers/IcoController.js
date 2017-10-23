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
    Ico.findOne({id: id}).populateAll().exec(function (err, icos) {
      if (err) return res.send(404);
      return res.json(icos);
    })
  }

};

