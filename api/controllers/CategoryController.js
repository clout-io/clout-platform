/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    Category.find().then(function (result) {
      return res.json(result)
    }).catch(function (err) {
      return res.json(404)
    })
  }
};

