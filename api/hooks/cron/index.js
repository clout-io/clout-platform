var cron = require('node-cron');


module.exports = function myHook(sails) {
  function initTasks() {
    sails.log.debug("Loading periodic tasks....");
    var tasks = sails.config.schedule.tasks;
    Object.keys(tasks).map(function (task) {
      cron.schedule(tasks[task].cron, tasks[task].task);
      sails.log.debug(task, "was init.")
    });
    sails.log.debug("Periodic tasks is load.");
  }

  return {
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        initTasks();
        return cb();
      });
    }
  }
};
