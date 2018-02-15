const Agenda = require('agenda');
const icoBench = require('../tasks/ico.icobench.sync');
const saveIco = require('../tasks/ico.save');
const syncRss = require('../tasks/rss.sync');


let mongoConnectionString = 'mongodb://127.0.0.1/agenda';
let agenda = null;


let init = function (cb) {
  sails.log.debug("Loading periodic tasks....");
  agenda = new Agenda({db: {address: mongoConnectionString}});
  agenda.defaultConcurrency(5);


  agenda.on('ready', function () {
    icoBench(agenda);
    saveIco(agenda);
    syncRss(agenda);
    sails.log.debug("Periodic tasks is load.");
    cb();
  });
  agenda.start();

  agenda.on('start', function (job) {
    sails.log.debug('Job %s starting', job.attrs.name);
  });

  agenda.on('complete', function (job) {
    sails.log.debug('Job %s finished', job.attrs.name);
  });
};

module.exports.init = init;
module.exports.getAgenda = function () {
  return agenda;
};

