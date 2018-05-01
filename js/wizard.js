// Файл wizard.js
'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var wizard = {
    onEyesChange: function (color) { },
    onCoatChange: function (color) { }
  }

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(COAT_COLORS);
    this.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(EYES_COLORS);
    this.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  return window.wizard = wizard;
})();
