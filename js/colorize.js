// Файл colorize.js
'use strict';

(function () {
  var COLORS = ['black', 'red', 'blue', 'yellow', 'green']

  var getRandomColor = function () {
    return COLORS[Math.floor(COLORS.length * Math.random())];
  };

  window.colorize = function (element) {
    element.addEventListener('click', function () {
      var color = getRandomColor();
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        document.getElementsByName('fireball-color')[0].value = color;
      } else {
        document.getElementsByName('eyes-color')[0].value = color;
        element.style.fill = color;
      }
    })
  }
})();
