'use strict';

// card ads //

var PIN = 'pin'
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
price.min = 1000;
price.max = 1000000;

address.required = true;

// correction fields //

// change time

var changeTime = function (selectIdOne, selectIdTwo) {
  selectIdOne.querySelector('[value="' + selectIdTwo.value + '"]').selected = true;
};

time.addEventListener('change', function () {
  changeTime(timeout, time);
});

timeout.addEventListener('change', function () {
  changeTime(time, timeout);
});

// change price

var changePrice = function (typeHousingValue) {
  switch (typeHousingValue) {
    case 'shack':
      priceNight.min = 0;
      break;
    case 'apartment':
      priceNight.min = 1000;
      break;
    case 'palace':
      priceNight.min = 10000;
      break;
  }
};

typeHousing.addEventListener('change', function () {
  changePrice(typeHousing.value);
});

// change rooms

var changeCapacity = function (roomNumberValue) {
  var number = +roomNumberValue;
  var valueCapacity = number === 2 || number === 100 ? 3 : 0;

  capacity.querySelector('[value="' + valueCapacity + '"]').selected = true;
};

var changeRoom = function (capacityValue) {
  var valueRoom = +capacityValue === 0 ? 1 : 2;

  roomNumber.querySelector('[value="' + valueRoom + '"]').selected = true;
};

roomNumber.addEventListener('change', function () {
  changeCapacity(roomNumber.value);
});

capacity.addEventListener('change', function () {
  changeRoom(capacity.value);
});
