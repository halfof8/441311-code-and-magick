// Файл setup.js
'use strict';

(function () {

  // Ищем контролы
  var setupSubmit = setup.querySelector('.setup-submit');
  var userNameInput = setup.querySelector('.setup-user-name');
  var form = window.setup.querySelector('.setup-wizard-form');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  var copyNumber = 1;

  var similarListElement = setup.querySelector('.setup-similar-list');


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

  // Отправляем данные и закрываем форму
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), window.closePopup(), errorHandler);
    evt.preventDefault();
  });

  function errorHandler (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();

