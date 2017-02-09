'use strict';

window.utils = {
  PIN: 'pin',
  ACTIVE_PIN: 'pin--active',
  SHOW_DIALOG: 'dialog--show',
  ROUNDED: 'rounded',
  KEY_CODE_ENTER: 13,
  isActiveEvent: function (e) {
    return e.keyCode && e.keyCode === this.KEY_CODE_ENTER;
  },
  handlerKeydownEvent: function (e) {
    var KEY_CODE_ESCAPE = 27;
    if (e.keyCode === KEY_CODE_ESCAPE) {
      window.closeDialog();
    }
  },
  hasClassPin: function (target) {
    return target.classList.contains(this.ROUNDED) || target.classList.contains(this.PIN);
  }
};

