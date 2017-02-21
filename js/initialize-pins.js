'use strict';

window.initializePins = (function () {
  var DIALOG = 'dialog';
  var PIN = 'pin';
  var ACTIVE_PIN = 'pin--active';
  var ROUNDED = 'rounded';
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogClose = null;
  var onSetupClose = null;
  var similarApartments = [];

  var getDataAds = function (e) {
    similarApartments = JSON.parse(e.target.responseText);
    createPin(similarApartments);
  };

  var createPin = function (data) {
    var templatePin = document.querySelector('#pin-template');
    var clonePine = templatePin.content.querySelector('.' + PIN);

    for (var i = 0; i < 3; i++) {
      var newPin = clonePine.cloneNode(true);
      newPin.setAttribute('data-pin-index', i);
      newPin.querySelector('.' + ROUNDED).setAttribute('src', data[i].author.avatar);
      newPin.style.left = data[i].location.x + 'px';
      newPin.style.top = data[i].location.y + 'px';
      tokyoPinMap.appendChild(newPin);
    }
  };

  window.load(DATA_URL, getDataAds);

  var findActivePin = function () {
    return document.querySelector('.' + ACTIVE_PIN);
  };

  var findDialog = function () {
    return document.querySelector('.' + DIALOG);
  };

  var removedDialog = function () {
    if (findDialog()) {
      findDialog().remove();
    }
  };

  var activationCloseDialog = function (e) {
    if (window.utils.pressingEscape(e)) {
      closeDialog();
    }
  };

  var openDialog = function (index) {
    var newDialog = window.createDialog(similarApartments[index]);
    document.querySelector('.tokyo').appendChild(newDialog);
    dialogClose = document.querySelector('.dialog__close');
    dialogClose.addEventListener('click', closeDialog);
    document.addEventListener('keydown', activationCloseDialog);
  };

  var closeDialog = function () {
    removedDialog();
    dialogClose.removeEventListener('click', closeDialog);
    document.removeEventListener('keydown', activationCloseDialog);

    if (typeof onSetupClose === 'function') {
      onSetupClose(findActivePin());
    }
    removeActivePin();
  };

  var removeActivePin = function () {
    var activePin = findActivePin();

    if (!activePin) {
      return;
    }
    removedDialog();
    activePin.setAttribute('aria-pressed', 'false');
    activePin.classList.remove(ACTIVE_PIN);
  };

  return function (e, cb) {
    var target = e.target;

    if (window.utils.hasClass(target, ROUNDED) || window.utils.hasClass(target, PIN)) {
      var index = null;
      removeActivePin();
      onSetupClose = cb;

      if (target.classList.contains(ROUNDED)) {
        target.parentNode.classList.add(ACTIVE_PIN);
        target.parentNode.setAttribute('aria-pressed', 'true');
        index = window.utils.hasDataAttribute(target.parentNode, 'pinIndex');
      } else {
        target.classList.add(ACTIVE_PIN);
        target.setAttribute('aria-pressed', 'true');
        index = window.utils.hasDataAttribute(target, 'pinIndex');
      }
      openDialog(index);
    }
  };
})();
