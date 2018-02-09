module.exports = function (agenda) {
  let cron = "0 */1 * * *",
    name = "icoBench",
    options = {
      priority: "default"
    };
  agenda.define(name, async function (job, done) {
    let result = await icoBenchAPI.getIcoList();
    let pages = result.pages;

    for (let i = 0; i < pages; i++) {
      sails.log.debug("Fetch page: ", i);
      let r = await icoBenchAPI.getIcoList(page = i);
      agenda.now('icoSave', {icos: r});
    }
    done();
  });
  agenda.every(cron, name);

  sails.log.debug(name, "was init.");
};
