// Файл render_wizard.js – отрисовываем одного похожего волшебника
'use strict';

//Ищем шаблон похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Функция рендеринга магов
window.renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
}


