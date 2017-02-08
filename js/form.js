'use strict';

// card ads //

var PIN = 'pin';
var ACTIVE_PIN = 'pin--active';
var SHOW_DIALOG = 'dialog--show';
var ROUNDED = 'rounded';
var KEY_CODE_ENTER = 13;
var KEY_CODE_ESCAPE = 27;

var tokyoMap = document.querySelector('.tokyo');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

// notice form elements
var form = document.querySelector('.notice__form');

var title = form.querySelector('#title');
var price = form.querySelector('#price');
var address = form.querySelector('#address');
var time = form.querySelector('#time');
var timeout = form.querySelector('#timeout');
var typeHousing = form.querySelector('#type');
var priceNight = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var checkInTime = [12, 13, 14];
var checkOutTime = [12, 13, 14];
var typeHousingValue = ['apartment', 'shack', 'palace'];
var priceNightValue = [0, 1000, 10000];
var roomNumberValue = [1, 2, 100];
var capacityValue = [0, 3, 3];

var isActiveEvent = function (e) {
  return e.keyCode && e.keyCode === KEY_CODE_ENTER;
};

var handlerKeydownEvent = function (e) {
  if (e.keyCode === KEY_CODE_ESCAPE) {
    closeDialog();
  }
};

var hasClassPin = function (target) {
  return target.classList.contains(ROUNDED) || target.classList.contains(PIN);
};

var openDialog = function (e) {
  var target = e.target;

  if (hasClassPin(target)) {
    removeActivePin();

    if (target.classList.contains(ROUNDED)) {
      target.parentNode.classList.add(ACTIVE_PIN);
      target.setAttribute('aria-pressed', 'true');
    } else {
      target.classList.add(ACTIVE_PIN);
      target.firstElementChild.setAttribute('aria-pressed', 'true');
    }

    dialog.classList.add(SHOW_DIALOG);
    dialog.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handlerKeydownEvent);
  }
};

var closeDialog = function () {
  dialog.classList.remove(SHOW_DIALOG);
  dialog.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', handlerKeydownEvent);
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

dialogClose.addEventListener('click', closeDialog);

tokyoMap.addEventListener('click', openDialog);

tokyoMap.addEventListener('keydown', function (e) {
  if (isActiveEvent(e)) {
    openDialog(e);
  }
});

// form validation //

title.required = true;
title.minLength = 30;
title.maxLength = 100;

price.required = true;
price.min = 0;
price.max = 1000000;

address.required = true;

// correction fields //

time.addEventListener('change', function () {
  window.synchronizeFields(time, timeout, checkInTime, checkOutTime, 'value');
});

timeout.addEventListener('change', function () {
  window.synchronizeFields(timeout, time, checkOutTime, checkInTime, 'value');
});

typeHousing.addEventListener('change', function () {
  window.synchronizeFields(typeHousing, priceNight, typeHousingValue, priceNightValue, 'min');
});

roomNumber.addEventListener('change', function () {
  window.synchronizeFields(roomNumber, capacity, roomNumberValue, capacityValue, 'value');
});

capacity.addEventListener('change', function () {
  window.synchronizeFields(capacity, roomNumber, capacityValue, roomNumberValue, 'value');
});
