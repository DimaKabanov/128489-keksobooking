'use strict';

window.utils = (function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESCAPE = 27;

  return {
    pressingEnter: function (e) {
      return e.keyCode && e.keyCode === KEY_CODE_ENTER;
    },
    pressingEscape: function (e) {
      return e.keyCode && e.keyCode === KEY_CODE_ESCAPE;
    },
    hasClass: function (element, className) {
      return element.classList.contains(className);
    }
  };
})();

