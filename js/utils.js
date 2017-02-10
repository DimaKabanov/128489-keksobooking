'use strict';

window.utils = {
  KEY_CODE_ENTER: 13,
  KEY_CODE_ESCAPE: 27,
  pressingEnter: function (e) {
    return e.keyCode && e.keyCode === this.KEY_CODE_ENTER;
  },
  pressingEscape: function (e) {
    return e.keyCode && e.keyCode === this.KEY_CODE_ESCAPE;
  },
  hasClass: function (element, className) {
    return element.classList.contains(className);
  }
};

