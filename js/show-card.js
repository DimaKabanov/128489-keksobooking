'use strict';

window.showCard = (function () {
  return function (element, className) {
    element.classList.add(className);
    element.setAttribute('aria-hidden', 'false');
  };
})();
