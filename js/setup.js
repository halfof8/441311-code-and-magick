'use strict';

// Значения для атрибутов внешнего вида волшебников
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
var FIRECOLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
];
var EYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Массив вошлебников
var wizards = [];

// Определяем фрагмент
var fragment = document.createDocumentFragment();

// Константы клавиатурных кодов
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Ищем диалог настроек
var userDialog = document.querySelector('.setup');


//Ищем область для похожих магов
var similarListElement = userDialog.querySelector('.setup-similar-list');

//Ищем шаблон похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Ищем контролы
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var setupEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setupFireball .querySelector('input');


// ОСНОВНОЙ БЛОК

// Рандомизируем массивы атрибутов
WIZARD_NAMES = shuffle(WIZARD_NAMES);
WIZARD_FAMILYNAMES = shuffle(WIZARD_FAMILYNAMES);
COLORS = shuffle(COLORS);
EYECOLORS = shuffle(EYECOLORS);

// Создаем массив похожих магов
for (var i = 0; i < 4; i++) {
  var wizard = {
    name: WIZARD_NAMES[i] + ' ' + WIZARD_FAMILYNAMES[i],
    coatColor: COLORS[i],
    eyesColor: EYECOLORS[i]
  };

  wizards[i] = wizard;
}


// Добавляем магов в область похожих магов
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Показаем область с магами
userDialog.querySelector('.setup-similar').classList.remove('hidden');



// Слушаем ивенты

// Открытие окна настроек
setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Закрытие окна настроек
setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});



// Валидация формы ввода имени
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Меняем цвет глаз
setupEyes.addEventListener('click', function() {
  setupEyes.style.fill = EYECOLORS[getRandomInt (0, (EYECOLORS.length-1) )];
 });

// Меняем цвет фаерболов
setupFireball.addEventListener('click', function() {
  var j = getRandomInt(0, (FIRECOLORS.length-1) );
  setupFireball.style.background = FIRECOLORS[j];
  fireballInput.value = FIRECOLORS[j];
});

// Отправка данных
setupSubmit.addEventListener('click', function() { });


// ОБЛАСТЬ ФУНКЦИЙ

// Функция генерация рандомного числа, включительно min, max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция смешивания массива
function shuffle (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Функция рендеринга магов
function renderWizard (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


// Функция открытия попапа настроек
function openPopup () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия попапа
function closePopup () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция закрытия попапа по ESC
function onPopupEscPress (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};


