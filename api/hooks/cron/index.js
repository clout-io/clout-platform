let {init, agenda} = require('../../utils/agenda');


module.exports = function cronHook(sails) {
  function initTasks(cb) {
    init(cb);
  }

  return {
    initialize: function (cb) {
      sails.on('hook:orm:loaded', function () {
        initTasks(cb);
      });
    }
  }
};
