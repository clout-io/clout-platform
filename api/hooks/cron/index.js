const Agenda = require('agenda');
const icoBench = require('../../tasks/ico.icobench.sync');


module.exports = function cronHook(sails) {
  function initTasks(cb) {
    let mongoConnectionString = 'mongodb://127.0.0.1/agenda';
    let agenda = new Agenda({db: {address: mongoConnectionString}});

    sails.log.debug("Loading periodic tasks....");
    let tasks = sails.config.schedule.tasks;
    agenda.defaultConcurrency(2);


    agenda.on('ready', function () {
      Object.keys(tasks).map(function (task) {
        agenda.define(tasks[task].name, tasks[task].options, tasks[task].task);
        agenda.every(tasks[task].cron, tasks[task].name);
        sails.log.debug(task, "was init.")
      });

      agenda.define(icoBench.name, icoBench.options, icoBench.task);
      agenda.every(icoBench.cron, icoBench.name);
      sails.log.debug(icoBench.name, "was init.");

      agenda.start();
      cb();
      sails.log.debug("Periodic tasks is load.");
    });

    agenda.on('start', function (job) {
      sails.log.debug('Job %s starting', job.attrs.name);
    });

    agenda.on('complete', function (job) {
      sails.log.debug('Job %s finished', job.attrs.name);
    });


  }

  return {
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        initTasks(cb);
      });
    }
  }
};
