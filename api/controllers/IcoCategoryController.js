/**
 * IcoCategoriesController
 *
 * @description :: Server-side logic for managing icocategories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: async function (req, res) {
    let result = await IcoCategory.find();
    return res.json(result);
  }
};

