const slug = require('slug');

module.exports = function (agenda) {
  let name = "icoSave",
    options = {priority: "default"};

  agenda.define(name, options, function (job, done) {
    console.log("icoSave work");
    // console.log(job.attrs.data.)

    job.attrs.data.icos.results.map(function (ico) {
      let icoSlug = slug(ico.name).toLowerCase();

      let path = sails.config.appPath + "/public/ico/" + icoSlug + ".png";

      File.download(ico.logo, path, function (data) {
        Ico.findOrCreate({slug: icoSlug}, {
          name: ico.name,
          description: ico.desc,
          startDate: ico.dates.icoStart,
          preIcoStart: ico.dates.preIcoStart,
          endDate: ico.dates.icoEnd,
          preIcoEnd: ico.dates.preIcoEnd,
          outImage: "/media/ico/" + icoSlug + ".png"
        }).exec(function createFindCB(error, createdOrFoundRecords) {
        })
      });

    });

    done();
  });
  sails.log.debug(name, "was init.");
};
