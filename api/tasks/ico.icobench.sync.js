module.exports = {
  cron: "*/1 * * * *",
  name: "icoBench",
  options: {priority: "default"},
  task: function (job, done) {
    icoBenchAPI.getAllIco();
    console.log("icoBench work");
  }
};
