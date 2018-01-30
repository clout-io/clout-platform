/**
 * IcoIndustryController
 *
 * @description :: Server-side logic for managing Icoindustries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: async function (req, res) {
    let result = await IcoIndustry.find();
    return res.json(result);
  }
};

