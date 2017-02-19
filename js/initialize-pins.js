'use strict';

window.initializePins = (function () {
  var DIALOG = 'dialog';
  var PIN = 'pin';
  var ACTIVE_PIN = 'pin--active';
  var ROUNDED = 'rounded';
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogClose = null;
  var pins = null;
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
      newPin.style.left = data[i].location.x + 'px';
      newPin.style.top = data[i].location.y + 'px';
      tokyoPinMap.appendChild(newPin);
    }
    pins = document.querySelectorAll('.' + PIN + ':not(.pin__main)');
  };

  (function () {
    window.load(DATA_URL, getDataAds);
  })();

  var findActivePin = function () {
    return document.querySelector('.' + ACTIVE_PIN);
  };

  var findDialog = function () {
    return document.querySelector('.' + DIALOG);
  };

  var activationCloseDialog = function (e) {
    if (window.utils.pressingEscape(e)) {
      closeDialog();
    }
  };

  var openDialog = function (index) {
    var newDialog = createDialog(similarApartments[index]);
    document.querySelector('.tokyo').appendChild(newDialog);
    dialogClose = document.querySelector('.dialog__close');
    dialogClose.addEventListener('click', closeDialog);
    document.addEventListener('keydown', activationCloseDialog);
  };

  var closeDialog = function () {

    if (!findDialog()) {
      return;
    }
    findDialog().remove();
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
    closeDialog();
    activePin.classList.remove(ACTIVE_PIN);
    activePin.firstElementChild.setAttribute('aria-pressed', 'false');
  };

  var createDialog = function (data) {
    var dialogTemplate = document.querySelector('#dialog-template');
    var cloneDialog = dialogTemplate.content.querySelector('.dialog');
    var dialogElement = cloneDialog.cloneNode(true);

    dialogElement.querySelector('.dialog__title > img').setAttribute('src', data.author.avatar);
    dialogElement.querySelector('.lodge__title').textContent = data.offer.title;
    dialogElement.querySelector('.lodge__address').textContent = data.offer.address;
    dialogElement.querySelector('.lodge__price').textContent = data.offer.price;
    dialogElement.querySelector('.lodge__type').textContent = data.offer.type;
    dialogElement.querySelector('.lodge__rooms-and-guests').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    dialogElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ',' + ' выезд до ' + data.offer.checkout;
    dialogElement.querySelector('.lodge__description').textContent = data.offer.description;

    for (var i = 0; i < data.offer.features.length; i++) {
      var features = dialogElement.querySelector('.lodge__features');
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + data.offer.features[i]);
      features.appendChild(feature);
    }

    for (var p = 0; p < data.offer.photos.length; p++) {
      var photos = dialogElement.querySelector('.lodge__photos');
      var photo = document.createElement('img');
      photo.setAttribute('src', data.offer.photos[p]);
      photo.setAttribute('width', '52');
      photo.setAttribute('height', '42');
      photo.setAttribute('alt', data.offer.type + ' photo');
      photos.appendChild(photo);
    }
    return dialogElement;
  };

  return function (e, cb) {
    var target = e.target;

    if (window.utils.hasClass(target, ROUNDED) || window.utils.hasClass(target, PIN)) {
      removeActivePin();
      onSetupClose = cb;

      if (target.classList.contains(ROUNDED)) {
        target.parentNode.classList.add(ACTIVE_PIN);
        target.setAttribute('aria-pressed', 'true');
      } else {
        target.classList.add(ACTIVE_PIN);
        target.firstElementChild.setAttribute('aria-pressed', 'true');
      }
      for (var i = 0; i < pins.length; i++) {
        if (target === pins[i] || target === pins[i].children[0]) {
          openDialog(i);
        }
      }
    }
  };
})();
