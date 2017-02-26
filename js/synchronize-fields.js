'use strict';

window.synchronizeFields = (function () {

  return function (domElementOne, domElementTwo, arrayValuesOne, arrayValuesTwo, callback) {
    var resultNumber = parseInt(domElementOne.value, 10);
    var value = !isNaN(resultNumber) ? resultNumber : domElementOne.value;

    for (var i = 0; i < arrayValuesOne.length; i++) {
      if (value === arrayValuesOne[i]) {
        callback(domElementTwo, arrayValuesTwo[i]);
        return;
      }
    }
  };
})();
