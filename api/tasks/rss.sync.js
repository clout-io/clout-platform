module.exports = function (agenda) {
  let cron = "*/5 * * * *",
    name = "syncRss",
    options = {priority: "default"};


  agenda.define(name, async function (job, done) {
    RSS.find().limit(1).sort("updatedAt ASC").then(function (rss) {

      async.map(rss, function (rssItem, callback) {
        let url = rssItem.rssLink;

        let options = {
          customFields: {
            item: ['description', 'image']
          }
        };

        parser.parseURL(url, options, function (err, parsed) {
            if (err) return callback(null, err);
            async.map(parsed.feed.entries, function (item, cb) {

              let $ = cheerio.load(item.content);
              let img = $('img').attr("src");

              if (!img && item["content:encoded"]) {
                $ = cheerio.load(item["content:encoded"]);
                img = $('img').attr("src");
              }

              const optionsOg = {'url': item.link};
              ogs(optionsOg, function (err, results) {
                if (err) return cb(null);
                if (!img && results.data) {
                  img = results.data.ogImage.url;
                }
                let pubDate = new Date(item.pubDate);

                let createData = {
                  title: item.title,
                  description: item.contentSnippet,
                  pubDate: pubDate,
                  image: img,
                  link: item.link,
                  guid: item.guid,
                  rss: rssItem.id
                };
                Press.findOrCreate({guid: item.guid}, createData).then(function (pressItem) {
                  cb(null, pressItem)
                }).catch(function (err) {
                  cb(err);
                });
              });
            }, function (err, result) {
              rssItem.save(function () {
                callback(err, result)
              });
            })
          }
        )
      }, function (err, result) {
        done();
      });
    })
  });
  agenda.every(cron, name);
  sails.log.debug(name, "was init.");
};
