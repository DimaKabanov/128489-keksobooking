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

    var filteringArrayPins = function () {
      var filteredPins = [];
      window.utils.hideElementsArray(pins, 'invisible');

      pins.forEach(function (item) {
        filteredPins.push(item);
      });

      filteredPins = filteredPins.filter(filterTypeHousing);
      filteredPins = filteredPins.filter(filterPriceHousing);
      filteredPins = filteredPins.filter(filterRoomNumber);
      filteredPins = filteredPins.filter(filterGuestsNumber);

      if (checkSelectedFeatures().length !== 0) {
        filteredPins = filteredPins.filter(filterFeatures);
      }

      var activePin = window.utils.findElement('pin--active');
      var activePinInArray = window.utils.findElementInArrayByClass(filteredPins, 'pin--active');

      if (activePin && !activePinInArray) {
        activePin.classList.remove('pin--active');
        window.utils.findElement('dialog').remove();
      }

      window.utils.showElementsArray(filteredPins, 'invisible');
    };

    // Фильтр типа жилья
    var filterTypeHousing = function (item) {
      var index = item.dataset.pinIndex;
      var type = housingType.value;
      if (type === 'any') {
        return true;
      }
      return data[index].offer.type === type;
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

    // Фильтр количества комнат
    var filterRoomNumber = function (item) {
      var index = item.dataset.pinIndex;
      var numberOfRooms = housingRoomNumber.value;
      if (numberOfRooms === 'any') {
        return true;
      }
      return data[index].offer.rooms === +numberOfRooms;
    };

    // Фильтр количества гостей
    var filterGuestsNumber = function (item) {
      var index = item.dataset.pinIndex;
      var numberOfGuests = housingGuestsNumber.value;
      if (numberOfGuests === 'any') {
        return true;
      }
      return data[index].offer.guests === +numberOfGuests;
    };

    // Фильтр по отмеченным фичам
    var filterFeatures = function (item) {
      var result = false;
      var index = item.dataset.pinIndex;
      var arrayFeaturesItem = data[index].offer.features;
      var arrayCheckedFeaturesItem = checkSelectedFeatures(); // Массив фичь отеченных в фильтре

      for (var i = 0; i < arrayCheckedFeaturesItem.length; i++) {
        for (var p = 0; p < arrayFeaturesItem.length; p++) {
          if (arrayCheckedFeaturesItem[i] === arrayFeaturesItem[p]) {
            result = true;
          }
        }
      }
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

    housingType.addEventListener('change', filteringArrayPins);
    housingPrice.addEventListener('change', filteringArrayPins);
    housingRoomNumber.addEventListener('change', filteringArrayPins);
    housingGuestsNumber.addEventListener('change', filteringArrayPins);
    housingFeatures.addEventListener('click', filteringArrayPins);

  };
})();
