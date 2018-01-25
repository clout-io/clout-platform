const CountryList = require('country-list');

module.exports = {
  list: function (req, res) {

    return res.json(CountryList().getCodeList());
  }
};
