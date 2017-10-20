/**
 * IcoController
 *
 * @description :: Server-side logic for managing icoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    Ico.find().exec(function (err, icos) {
      if (err) return res.send(400);
      return res.json(icos)
    })
  },

  info: function (req, res) {
    var id = req.param("id");
    Ico.findOne({id: id}).populateAll().exec(function (err, icos) {
      if (err) return res.send(404);
      return res.json(icos);
    })
  }

};

