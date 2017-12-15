'use strict';

(function () {
  /**
   * Интервал выполнения функции.
   * @type {Number}
   */
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
