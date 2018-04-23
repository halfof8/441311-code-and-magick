// Файл similar.js
'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');

  //Ищем шаблон похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  // Добавляем магов в область похожих магов
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);


  // Показаваем область с магами
  setup.querySelector('.setup-similar').classList.remove('hidden');

  // Функция рендеринга магов
  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

})();
