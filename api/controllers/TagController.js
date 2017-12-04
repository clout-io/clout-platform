/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  search: async (req, res) => {

    let term = req.param('term');
    let altcoinTags = await Altcoin.find({id: {contains: term}, select: ['id']}).limit(15);
    let existsHashTags = await Tag.find({id: {contains: term}, select: ['id']}).limit(15);

    let allTags = _.reduceRight([altcoinTags, existsHashTags], function (a, b) {
      return a.concat(b);
    }, []);
    let idOnly = _.map(allTags, function (item) {
      return item.id
    });
    let all = _.uniq(idOnly).sort(function (a, b) {
      if(a.indexOf(term) < b.indexOf(term)){
        return -1;
      }else{
        return 1
      }
    });


    return res.json(all)
  }

};

