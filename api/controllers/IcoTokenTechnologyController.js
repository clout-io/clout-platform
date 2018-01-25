/**
 * IcoTokenTechnologyController
 *
 * @description :: Server-side logic for managing Icotokentechnologies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: async function (req, res) {
    let result = await IcoTokenTechnology.find();
    return res.json(result);
  }

};

