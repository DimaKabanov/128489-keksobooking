'use strict';

window.utils = (function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESCAPE = 27;

  return {
    isPressEnter: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE_ENTER;
    },
    isPressEscape: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE_ESCAPE;
    },
    syncValues: function (element, value) {
      element.value = value;
    },
    syncValueWithMin: function (element, value) {
      element.min = value;
    },
    findElementInArrayByClass: function (array, className) {
      var result = false;
      array.forEach(function (item) {
        if (item.classList.contains(className)) {
          result = true;
        }
      });
      return result;
    }
  };
})();

