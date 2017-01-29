'use strict';

// card ads //

var ACTIVE_PIN = 'pin--active';
var SHOW_DIALOG = 'dialog--show';
var ROUNDED = 'rounded';

var pins = document.querySelectorAll('.pin');
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

var openDialog = function (e) {
  var target = e.target;

  removeActivePin();

  if (target.classList.contains(ROUNDED)) {
    target.parentNode.classList.add(ACTIVE_PIN);
  } else {
    target.classList.add(ACTIVE_PIN);
  }

  dialog.classList.add(SHOW_DIALOG);
};

var closeDialog = function () {
  dialog.classList.remove(SHOW_DIALOG);
  removeActivePin();
};

var removeActivePin = function () {
  var activePin = document.querySelector('.' + ACTIVE_PIN);

  if (!activePin) {
    return;
  }

  activePin.classList.remove(ACTIVE_PIN);
};

dialogClose.addEventListener('click', closeDialog);

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', openDialog);
}

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
