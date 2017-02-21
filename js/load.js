'use strict';

(function () {
  window.load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.open('GET', url);
    xhr.send();
  };
})();
