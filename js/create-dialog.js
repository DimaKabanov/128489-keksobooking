'use strict';

window.createDialog = (function () {
  return function (data) {
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
})();
