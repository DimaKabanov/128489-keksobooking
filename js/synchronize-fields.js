'use strict';

window.synchronizeFields = function (domElementOne, domElementTwo, arrayValuesOne, arrayValuesTwo, property) {
  var resultNumber = +domElementOne.value;
  var value = !isNaN(resultNumber) ? resultNumber : domElementOne.value;

  for (var i = 0; i < arrayValuesOne.length; i++) {
    if (value === arrayValuesOne[i]) {
      domElementTwo[property] = arrayValuesTwo[i];
    }
  }
};
