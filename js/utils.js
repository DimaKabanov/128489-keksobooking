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
    },
    focusOnElement: function (element) {
      element.focus();
    },
    syncValues: function (element, value) {
      element.value = value;
    },
    syncValueWithMin: function (element, value) {
      element.min = value;
    },
    hasDataAttribute: function (element, attribute) {
      return element.dataset[attribute];
    },
    findElement: function (className) {
      return document.querySelector('.' + className);
    },
    hideElementsArray: function (array, className) {
      array.forEach(function (item) {
        item.classList.add(className);
      });
    },
    showElementsArray: function (array, className) {
      array.forEach(function (item) {
        item.classList.remove(className);
      });
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

