// Файл data.js
'use strict';

window.createWizards = function (amount) {

  var wizards = [];

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_FAMILYNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  //Рандомизируем массивы и создаем массив магов
  WIZARD_NAMES = window.util.shuffle(WIZARD_NAMES);
  WIZARD_FAMILYNAMES = window.util.shuffle(WIZARD_FAMILYNAMES);
  COLORS = window.util.shuffle(COLORS);
  EYECOLORS = window.util.shuffle(EYECOLORS);

  for (var i = 0; i < amount; i++) {
    var wizard = {
      name: WIZARD_NAMES[i] + ' ' + WIZARD_FAMILYNAMES[i],
      coatColor: COLORS[i],
      eyesColor: EYECOLORS[i]
    };

    wizards[i] = wizard;
  }

  return wizards;
}
