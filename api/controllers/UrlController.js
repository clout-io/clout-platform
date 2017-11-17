/**
 * UrlController
 *
 * @description :: Server-side logic for managing Urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const ogs = require('open-graph-scraper');

module.exports = {
  ogInfo: function (req, res) {
    var url = req.param("url");
    const options = {'url': url};
    ogs(options, function (err, results) {
      if (err) return res.json(400, err);
      return res.json(results)
    });
  },
  redirect: function (req, res) {
    var url = req.param("u");
    const options = {'url': url};
    ogs(options, function (err, results) {
      if (err) return res.redirect("/");
      res.redirect(results.data.ogUrl);
    });
  }
};

