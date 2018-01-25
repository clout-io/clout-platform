/**
 * IcoTokenTypeController
 *
 * @description :: Server-side logic for managing Icotokentypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: async function (req, res) {
    let result = await IcoTokenType.find();
    return res.json(result);
  }
};

