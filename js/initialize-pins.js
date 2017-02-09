'use strict';

var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var openDialog = function () {
  dialog.classList.add(window.utils.SHOW_DIALOG);
  dialog.setAttribute('aria-hidden', 'false');
  dialogClose.addEventListener('click', window.closeDialog);
  document.addEventListener('keydown', window.utils.handlerKeydownEvent);
};

window.closeDialog = function () {
  dialog.classList.remove(window.utils.SHOW_DIALOG);
  dialog.setAttribute('aria-hidden', 'true');
  dialogClose.removeEventListener('click', window.closeDialog);
  document.removeEventListener('keydown', window.utils.handlerKeydownEvent);
  removeActivePin();
};

var removeActivePin = function () {
  var activePin = document.querySelector('.' + window.utils.ACTIVE_PIN);

  if (!activePin) {
    return;
  }
  activePin.classList.remove(window.utils.ACTIVE_PIN);
  activePin.firstElementChild.setAttribute('aria-pressed', 'false');
};

window.initializePins = function (e) {
  var target = e.target;

  if (window.utils.hasClassPin(target)) {
    removeActivePin();

    if (target.classList.contains(window.utils.ROUNDED)) {
      target.parentNode.classList.add(window.utils.ACTIVE_PIN);
      target.setAttribute('aria-pressed', 'true');
    } else {
      target.classList.add(window.utils.ACTIVE_PIN);
      target.firstElementChild.setAttribute('aria-pressed', 'true');
    }

    openDialog();
  }
};
