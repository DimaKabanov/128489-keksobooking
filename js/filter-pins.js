'use strict';

window.filterPins = (function () {
  return function (data) {
    var filters = document.querySelector('.tokyo__filters');
    var housingType = filters.querySelector('#housing_type');
    var housingPrice = filters.querySelector('#housing_price');
    var housingRoomNumber = filters.querySelector('#housing_room-number');
    var housingGuestsNumber = filters.querySelector('#housing_guests-number');
    var housingFeatures = filters.querySelector('#housing_features');
    var features = housingFeatures.querySelectorAll('input');
    var pins = document.querySelectorAll('.pin:not(.pin__main)');

    var onArrayPinsChange = function () {
      var filteredPins = [];
      window.utils.hideElementsArray(pins, 'invisible');

      pins.forEach(function (item) {
        filteredPins.push(item);
      });

      filteredPins = filteredPins.filter(function (item) {
        return filterElement(item, housingType, 'type');
      });

      filteredPins = filteredPins.filter(filterPriceHousing);

      filteredPins = filteredPins.filter(function (item) {
        return filterElement(item, housingRoomNumber, 'rooms');
      });

      filteredPins = filteredPins.filter(function (item) {
        return filterElement(item, housingGuestsNumber, 'guests');
      });

      if (checkSelectedFeatures().length !== 0) {
        filteredPins = filteredPins.filter(filterFeatures);
      }

      var activePin = document.querySelector('.pin--active');
      var activePinInArray = window.utils.findElementInArrayByClass(filteredPins, 'pin--active');

      if (activePin && !activePinInArray) {
        activePin.classList.remove('pin--active');
        document.querySelector('.dialog').remove();
      }

      window.utils.showElementsArray(filteredPins, 'invisible');
    };

    // Фильтр для типа жилья, количества гостей и комнат
    var filterElement = function (item, control, path) {
      var resultNumber = +control.value;
      var value = !isNaN(resultNumber) ? resultNumber : control.value;

      if (value === 'any') {
        return true;
      }
      return data[item.dataset.pinIndex].offer[path] === value;
    };

    // Фильтр стоимости жилья
    var filterPriceHousing = function (item) {
      var price = data[item.dataset.pinIndex].offer.price;
      switch (housingPrice.value) {
        case 'low':
          return price < 10000;
        case 'middle':
          return price >= 10000 && price < 50000;
        case 'hight':
          return price >= 50000;
        default:
          return false;
      }
    };

    // Фильтр по отмеченным фичам
    var filterFeatures = function (item) {
      var result = false;
      var arrayFeaturesItem = data[item.dataset.pinIndex].offer.features;

      checkSelectedFeatures().forEach(function (elem) {
        if (arrayFeaturesItem.indexOf(elem) !== -1) {
          result = true;
        }
      });

      return result;
    };

    // Проверить отмеченные фичи
    var checkSelectedFeatures = function () {
      var arrayFeatureValue = [];

      features.forEach(function (item) {
        if (item.checked) {
          arrayFeatureValue.push(item.value);
        }
      });
      return arrayFeatureValue;
    };

    // Показать 3 пина
    var showInitialPins = function () {
      window.utils.hideElementsArray(pins, 'invisible');

      for (var i = 0; i < 3; i++) {
        pins[i].classList.remove('invisible');
      }
    };

    housingType.addEventListener('change', onArrayPinsChange);
    housingPrice.addEventListener('change', onArrayPinsChange);
    housingRoomNumber.addEventListener('change', onArrayPinsChange);
    housingGuestsNumber.addEventListener('change', onArrayPinsChange);
    housingFeatures.addEventListener('change', onArrayPinsChange);
    showInitialPins();
  };
})();
