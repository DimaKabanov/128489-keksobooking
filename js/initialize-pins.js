'use strict';

window.initializePins = (function () {
  var PIN = 'pin';
  var ACTIVE_PIN = 'pin--active';
  var SHOW_DIALOG = 'dialog--show';
  var ROUNDED = 'rounded';

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  var activationCloseDialog = function (e) {
    if (window.utils.pressingEscape(e)) {
      closeDialog();
    }
  };

  var openDialog = function () {
    dialog.classList.add(SHOW_DIALOG);
    dialog.setAttribute('aria-hidden', 'false');
    dialogClose.addEventListener('click', closeDialog);
    document.addEventListener('keydown', activationCloseDialog);
  };

  var closeDialog = function () {
    dialog.classList.remove(SHOW_DIALOG);
    dialog.setAttribute('aria-hidden', 'true');
    dialogClose.removeEventListener('click', closeDialog);
    document.removeEventListener('keydown', activationCloseDialog);
    removeActivePin();
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.' + ACTIVE_PIN);

    if (!activePin) {
      return;
    }
    activePin.classList.remove(ACTIVE_PIN);
    activePin.firstElementChild.setAttribute('aria-pressed', 'false');
  };

  return function (e) {
    var target = e.target;

    if (window.utils.hasClass(target, ROUNDED) || window.utils.hasClass(target, PIN)) {
      removeActivePin();

      if (target.classList.contains(ROUNDED)) {
        target.parentNode.classList.add(ACTIVE_PIN);
        target.setAttribute('aria-pressed', 'true');
      } else {
        target.classList.add(ACTIVE_PIN);
        target.firstElementChild.setAttribute('aria-pressed', 'true');
      }
      openDialog();
    }
  };
})();
