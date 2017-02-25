'use strict';

window.initializePins = (function () {
  var DIALOG = 'dialog';
  var PIN = 'pin';
  var ACTIVE_PIN = 'pin--active';
  var ROUNDED = 'rounded';
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var mainPin = null;
  var dialogClose = null;
  var onSetupClose = null;
  var similarApartments = [];

  var getDataAds = function (evt) {
    similarApartments = evt.target.response;
    createPin(similarApartments);
    window.filterPins(similarApartments);
  };

  var createPin = function (data) {
    var index = 0;
    var templatePin = document.querySelector('#pin-template');
    var clonePine = templatePin.content.querySelector('.' + PIN);

    data.forEach(function (item) {
      var newPin = clonePine.cloneNode(true);
      newPin.setAttribute('data-pin-index', index);
      newPin.querySelector('.' + ROUNDED).setAttribute('src', item.author.avatar);
      newPin.style.left = item.location.x + 'px';
      newPin.style.top = item.location.y + 'px';
      tokyoPinMap.appendChild(newPin);
      index++;
    });
  };

  window.load(DATA_URL, getDataAds);

  var findActivePin = function () {
    return document.querySelector('.' + ACTIVE_PIN);
  };

  var findDialog = function () {
    return document.querySelector('.' + DIALOG);
  };

  var removedDialog = function () {
    if (findDialog() && !mainPin) {
      findDialog().remove();
    }
  };

  var onActivationDialogClose = function (evt) {
    if (window.utils.pressingEscape(evt)) {
      onDialogClose();
    }
  };

  var openDialog = function (index) {
    var newDialog = window.createDialog(similarApartments[index]);
    document.querySelector('.tokyo').appendChild(newDialog);
    dialogClose = document.querySelector('.dialog__close');
    dialogClose.addEventListener('click', onDialogClose);
    document.addEventListener('keydown', onActivationDialogClose);
  };

  var onDialogClose = function () {
    removedDialog();
    dialogClose.removeEventListener('click', onDialogClose);
    document.removeEventListener('keydown', onActivationDialogClose);

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

  return function (evt, cb) {
    var target = evt.target;
    var parentTarget = target.parentNode;

    if (target.classList.contains(ROUNDED) || target.classList.contains(PIN)) {
      onSetupClose = cb;
      var targetElement = target.classList.contains(ROUNDED) ? parentTarget : target;
      var index = targetElement.dataset['pinIndex'];

      mainPin = targetElement.classList.contains('pin__main');
      removeActivePin();
      targetElement.classList.add(ACTIVE_PIN);
      targetElement.setAttribute('aria-pressed', 'true');

      if (index) {
        openDialog(index);
      }
    }
  };
})();
