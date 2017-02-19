'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.open('GET', url);
    xhr.send();
  };
})();
