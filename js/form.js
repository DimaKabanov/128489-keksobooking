'use strict';

// card ads //

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var openDialog = function (e) {
  var target = e.target;

  removeActivePin();

  if (target.classList.contains('rounded')) {
    target.parentNode.classList.add('pin--active');
  } else {
    target.classList.add('pin--active');
  }

  dialog.classList.add('dialog--show');
};

var closeDialog = function () {
  dialog.classList.remove('dialog--show');
  removeActivePin();
};

var removeActivePin = function () {
  var activePin = document.querySelector('.pin--active');

  if (!activePin) {
    return;
  }

  activePin.classList.remove('pin--active');
};

dialogClose.addEventListener('click', closeDialog);

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', openDialog);
}

// form validation //

var title = document.getElementById('title');
var price = document.getElementById('price');
var address = document.getElementById('address');

title.required = true;
title.minLength = 30;
title.maxLength = 100;

price.required = true;
price.min = 1000;
price.max = 1000000;

address.required = true;

// correction fields //

var time = document.getElementById('time');
var timeout = document.getElementById('timeout');
var typeHousing = document.getElementById('type');
var priceNight = document.getElementById('price');
var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

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
  var valueCapacity;

  if (roomNumberValue === '2' || roomNumberValue === '100') {
    valueCapacity = '3';
  } else {
    valueCapacity = '0';
  }

  capacity.querySelector('[value="' + valueCapacity + '"]').selected = true;
};

var changeRoom = function (capacityValue) {
  var valueRoom;

  if (capacityValue === '0') {
    valueRoom = '1';
  } else {
    valueRoom = '2';
  }

  roomNumber.querySelector('[value="' + valueRoom + '"]').selected = true;
};

roomNumber.addEventListener('change', function () {
  changeCapacity(roomNumber.value);
});

capacity.addEventListener('change', function () {
  changeRoom(capacity.value);
});
