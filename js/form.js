'use strict';

var titleInput = document.getElementById('title');
var timeinInput = document.getElementById('timein');
var timeoutInput = document.getElementById('timeout');
var typeInput = document.getElementById('type');
var priceInput = document.getElementById('price');
var roomNumberInput = document.getElementById('room_number');
var capacityInput = document.getElementById('capacity');

/**
 * При изменении значения первого поля, изменяет значение второго поля на такое же.
 * @param  {[type]} firstInput
 * @param  {[type]} secInput
 */
var syncInputs = function (firstInput, secInput) {
  var firstInputValue = firstInput.value;
  secInput.value = firstInputValue;
};

/**
 * При изменении значения первого поля, изменяет минимальное значение второго поля.
 * @param  {[type]} type
 * @param  {[type]} price
 */
var syncMinPrice = function (type, price) {
  switch (type.value) {
    case 'bungalo':
      price.min = 0;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'palace':
      price.min = 10000;
      break;
  }
};

/**
 * При изменении значения первого поля, меняет значение второго.
 * @param  {[type]} rooms
 * @param  {[type]} capacity
 */
var syncCapacity = function (rooms, capacity) {
  switch (rooms.value) {
    case '1':
      capacity.value = '1';
      break;
    case '2':
      capacity.value = '2';
      break;
    case '3':
      capacity.value = '3';
      break;
    case '100':
      capacity.value = '0';
      break;
  }
};

// Дополнительная валидация для браузеров, не поддерживающих minlength.
titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Минимально допустимое количество символов: 30. Длина текста сейчас: ' + target.value.length + '.');
  } else {
    target.setCustomValidity('');
  }
});

timeinInput.addEventListener('change', function () {
  syncInputs(timeinInput, timeoutInput);
});

timeoutInput.addEventListener('change', function () {
  syncInputs(timeoutInput, timeinInput);
});

typeInput.addEventListener('change', function () {
  syncMinPrice(typeInput, priceInput);
});

roomNumberInput.addEventListener('change', function () {
  syncCapacity(roomNumberInput, capacityInput);
});
