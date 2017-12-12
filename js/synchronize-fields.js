'use strict';

(function () {
  window.synchronizeFields = function (firstInput, secInput, firstInputValues, secInputValues, syncFunction) {
    var firstInputIndex = firstInputValues.indexOf(firstInput.value);
    var secInputValue = secInputValues[firstInputIndex];

    syncFunction(secInput, secInputValue);
  };
})();
