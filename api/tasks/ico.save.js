const slug = require('slug');

let isDate = function (date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = function (agenda) {
  let name = "icoSave",
    options = {priority: "default"};

  agenda.define(name, options, function (job, done) {
      sails.log.debug(name, "work");
      async.map(job.attrs.data.icos.results, async function (ico, cb) {

        let icoSlug = slug(ico.name).toLowerCase();
        sails.log.debug("Received :", icoSlug);

        let path = sails.config.appPath + "/public/ico/" + icoSlug + ".png";

        File.download(ico.logo, path, async function (data) {
          let icoBody = {
            name: ico.name,
            description: ico.desc,
            outImage: "/media/ico/" + icoSlug + ".png"
          };
          if (isDate(ico.dates.icoStart)) {
            icoBody.startDate = ico.dates.icoStart;
          }
          if (isDate(ico.dates.icoEnd)) {
            icoBody.endDate = ico.dates.icoEnd;
          }
          if (isDate(ico.dates.preIcoStart)) {
            icoBody.preIcoStart = ico.dates.preIcoStart;
          }
          if (isDate(ico.dates.preIcoEnd)) {
            icoBody.preIcoEnd = ico.dates.preIcoEnd;
          }

          let detailInfo = await icoBenchAPI.getIco(ico.id);
          console.log(detailInfo)


          Ico.findOrCreate({slug: icoSlug}, icoBody).exec(function createFindCB(error, createdOrFoundRecords) {
            sails.log.debug("saved event :", icoSlug);
            cb(error, createdOrFoundRecords);
          })
        });
      }, function (err, result) {
        done();
      });


    }
  );
  sails.log.debug(name, "was init.");
};
