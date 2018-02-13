module.exports.fetch = async function (agenda, done) {
  let result = await icoBenchAPI.getIcoList();
  let pages = result.pages;

  let range = n => Array.from(Array(n).keys());
  async.map(range(pages), async function (page, cb) {
    sails.log.debug("Fetch page: ", page);
    let r = await icoBenchAPI.getIcoList(page);
    agenda.now('icoSave', {icos: r});
    cb(null, r)
  }, function (err, res) {
    done();
  });
};
