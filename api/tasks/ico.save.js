const slug = require('slug');
const {SCORE_LEVEL, ICO_STATUS, PROJECT_STAGE} = require('../const/ico');
const CountryList = require('country-list');


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
          if (ico.raised > 0) {
            icoBody.amount = ico.raised;
          } else {
            icoBody.amount = 0;
          }

          let detailInfo = await icoBenchAPI.getIco(ico.id);

          let socials = [];
          let members = [];

          if (detailInfo.team) {
            members = detailInfo.team.map(function (item) {
              item.role = item.title;
              item.link = item.links;
              delete item.title;
              delete item.links;
              return item;
            });
          }

          if (detailInfo.links) {
            Object.keys(detailInfo.links).map(function (item) {

              if (item === "www") {
                icoBody.site = detailInfo.links[item];
                return []
              }
              if (item === "whitepaper") {
                icoBody.whitepaper = detailInfo.links[item];
                return []
              }
              if (detailInfo.links[item] && item) {
                socials.push({
                  type: item,
                  link: detailInfo.links[item]
                })
              }
            });
          }

          if (detailInfo.country) {
            let cPos = Object.values(CountryList().getCodeList()).indexOf(detailInfo.country);
            if (cPos !== -1) {
              icoBody.country = Object.keys(CountryList().getCodeList())[cPos];
            } else {
              icoBody.country = detailInfo.country;
            }

          }

          if (detailInfo.finance && detailInfo.finance.tokentype) {
            let tt = await IcoTokenType.findOrCreate({id: slug(detailInfo.finance.tokentype)}, {name: detailInfo.finance.tokentype});
            icoBody.tokenType = tt.id;
          }

          if (detailInfo.finance && detailInfo.finance.platform) {
            icoBody.accepts = detailInfo.finance.platform;
          }


          if (detailInfo.categories) {
            let createdCategories = await IcoCategory.findOrCreate(detailInfo.categories.map(function (item) {
              let sluged = "";
              if (item.name) {
                sluged = slug(item.name)
              }
              return {"id": sluged}
            }), detailInfo.categories.map(function (item) {
              return {name: item.name}
            }));
            icoBody.categories = createdCategories.map(function (item) {
              return item.id;
            })
            icoBody.categoriesList = icoBody.categories;
          }


          if (!icoBody.startDate && !icoBody.endDate) {
            icoBody.status = ICO_STATUS.upcoming;
          }
          let currentDate = new Date();


          if (icoBody.endDate && new Date(icoBody.endDate) >= currentDate && new Date(icoBody.startDate) <= currentDate) {
            icoBody.status = ICO_STATUS.ongoing;
          }

          if (icoBody.startDate && new Date(icoBody.startDate) > currentDate) {
            icoBody.status = ICO_STATUS.upcoming;
          }

          if (icoBody.endDate && new Date(icoBody.endDate) < currentDate) {
            icoBody.status = ICO_STATUS.closed;
          }

          Ico.updateOrCreate({slug: icoSlug}, icoBody).then(async function (createdIco) {
            if (!createdIco) {
              return cb()
            }
            try {
              let links = await IcoSocial.findOrCreate(socials.map(function (item) {
                return {link: item.link}
              }), socials);
              let team = await IcoTeam.findOrCreate(members.map(function (item) {
                return {name: item.name}
              }), members);

              createdIco.socials.add(links);
              createdIco.team.add(team);
              await createdIco.save();
            } catch (e) {
              // console.log(e)
            }

            sails.log.debug("Saved :", icoSlug);
            cb(null, createdIco);
          })
        });
      }, function (err, result) {
        done();
      });


    }
  );
  sails.log.debug(name, "was init.");
};
