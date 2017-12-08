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
    let IcoTags = await Ico.find({slug: {contains: term}, select: ['slug']}).limit(15);
    let existsHashTags = await Tag.find({id: {contains: term}, select: ['id']}).limit(15);

    let allTags = _.reduceRight([altcoinTags, existsHashTags, IcoTags], function (a, b) {
      return a.concat(b);
    }, []);
    let idOnly = _.map(allTags, function (item) {
      if(_.has(item, 'slug'))
        return item.slug;

      return item.id
    });
    let all = _.uniq(idOnly).sort(function (a, b) {
      if (a.indexOf(term) < b.indexOf(term)) {
        return -1;
      } else {
        return 1
      }
    });


    return res.json(all)
  }

};

