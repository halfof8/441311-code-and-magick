"use strict";

var WIZARD_NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон"
];
var WIZARD_FAMILYNAMES = [
  "да Марья",
  "Верон",
  "Мирабелла",
  "Вальц",
  "Онопко",
  "Топольницкая",
  "Нионго",
  "Ирвинг"
];
var COLORS = [
  "rgb(101, 137, 164)",
  "rgb(241, 43, 107)",
  "rgb(146, 100, 161)",
  "rgb(56, 159, 117)",
  "rgb(215, 210, 55)",
  "rgb(0, 0, 0)"
];
var EYECOLORS = ["black", "red", "blue", "yellow", "green"];

var wizards = [];

//ищем setup и показываем
var userDialog = document.querySelector(".setup");
userDialog.classList.remove("hidden");

//Функция смешивания массива
var shuffle = function(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

//Рандомизируем массивы
WIZARD_NAMES = shuffle(WIZARD_NAMES);
WIZARD_FAMILYNAMES = shuffle(WIZARD_FAMILYNAMES);
COLORS = shuffle(COLORS);
EYECOLORS = shuffle(EYECOLORS);

//Ищем область для похожим магов
var similarListElement = userDialog.querySelector(".setup-similar-list");

var similarWizardTemplate = document
  .querySelector("#similar-wizard-template")
  .content.querySelector(".setup-similar-item");

//Создаем массив магов
for (var i = 0; i < 4; i++) {
  var wizard = {
    name: WIZARD_NAMES[i] + " " + WIZARD_FAMILYNAMES[i],
    coatColor: COLORS[i],
    eyesColor: EYECOLORS[i]
  };

  wizards[i] = wizard;
}

//рисуем магов
var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
  wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
  wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(".setup-similar").classList.remove("hidden");
