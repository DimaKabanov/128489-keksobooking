'use strict';

// card ads //

var tokyoMap = document.querySelector('.tokyo');

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

tokyoMap.addEventListener('click', window.initializePins);

tokyoMap.addEventListener('keydown', function (e) {
  if (window.utils.isActiveEvent(e)) {
    window.initializePins(e);
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
