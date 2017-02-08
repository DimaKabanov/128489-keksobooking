'use strict';

window.synchronizeFields = function (domElementOne, domElementTwo, arrayValuesOne, arrayValuesTwo, property) {
  var value = property === 'value' ? +domElementOne.value : domElementOne.value;

  for (var i = 0; i < arrayValuesOne.length; i++) {
    if (value === arrayValuesOne[i]) {
      domElementTwo[property] = arrayValuesTwo[i];
    }
  }
};
