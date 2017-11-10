var Agenda = require('agenda');


module.exports = function myHook(sails) {
  function initTasks(cb) {
    var mongoConnectionString = 'mongodb://127.0.0.1/agenda';
    var agenda = new Agenda({db: {address: mongoConnectionString}});

    sails.log.debug("Loading periodic tasks....");
    var tasks = sails.config.schedule.tasks;
    agenda.defaultConcurrency(2);


    agenda.on('ready', function () {
      Object.keys(tasks).map(function (task) {
        agenda.define(tasks[task].name, tasks[task].options, tasks[task].task);
        agenda.every(tasks[task].cron, tasks[task].name);
        sails.log.debug(task, "was init.")
      });

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
