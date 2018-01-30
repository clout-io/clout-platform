/**
 * IcoStageController
 *
 * @description :: Server-side logic for managing Icostages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: async function (req, res) {
    let result = await IcoStage.find();
    return res.json(result);
  }
};

