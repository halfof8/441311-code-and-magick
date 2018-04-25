'use strict';

(function () {

  // Определяем фрагмент
  var fragment = document.createDocumentFragment();

  // Ищем контролы
  var setupSubmit = setup.querySelector('.setup-submit');
  var userNameInput = setup.querySelector('.setup-user-name');

  var wizard = setup.querySelector('.wizard');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  var copyNumber = 1;

  var similarListElement = setup.querySelector('.setup-similar-list');

  var wizards = window.createWizards(4);


  // Обработчики перетаскивания элементов из магазина
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      artifactsElement.style.border = '2px dashed red';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });


  // Обработчики перетаскивания элементов из инвентаря
  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      artifactsElement.style.border = '2px dashed red';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });


  // Обработчики перетаскивания элементов в инвентарь
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });


  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.border = '';

    if (evt.target.tagName.toLowerCase() === 'img') {
      alert('cell is occupied');
    } else if (draggedItem.parentNode.parentNode.className == 'setup-artifacts-shop') {
      var nodeCopy = draggedItem.cloneNode(true);
      nodeCopy.id = "copy number " + copyNumber; /* We cannot use the same ID */
      evt.target.appendChild(nodeCopy);
      copyNumber++;
    } else {
      evt.target.appendChild(draggedItem);
    }
    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    artifactsElement.style.border = '2px dashed red';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.border = '2px dashed red';
    evt.preventDefault();
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

  // Показаваем область с магами
  setup.querySelector('.setup-similar').classList.remove('hidden');

  // Добавляем магов в область похожих магов
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(window.renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);


  // Меняем цвет глаз
  wizardEyes.addEventListener('click', function () {
    window.colorize(wizardEyes);
  });


  // Меняем цвет фаерболов
  wizardFireball.addEventListener('click', function () {
    window.colorize(wizardFireball);
  });

})();
