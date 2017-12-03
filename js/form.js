'use strict';

var form = document.querySelector('.notice__form');
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

  return secInput;
};

/**
 * При изменении значения первого поля, изменяет минимальное значение второго поля.
 * @param  {[type]} type
 * @param  {[type]} price
 */
var syncMinPrice = function (type, price) {
  var minPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  }
  var typeValue = type.value;
  price.min = minPrice[typeValue];

  return price;
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

  return capacity;
};

var checkTitle = function (title) {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок должен состоять максимум из 100 символов.');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле.');
  }

  return title;
};

var checkPrice = function (price) {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Минимальное значение не может быть меньше ' + price.min + '.');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Максимальное значение не может быть больше ' + price.max + '.');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле.');
  }

  return price;
}

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

form.addEventListener('invalid', function (evt) {
  if (evt.target.id === 'title') {
    checkTitle(evt.target);
  } else if (evt.target.id === 'price') {
    checkPrice(evt.target);
  }
});

// Дополнительная валидация заголовка для браузеров, не поддерживающих minlength.
titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Минимально допустимое количество символов: 30. Длина текста сейчас: ' + target.value.length + '.');
  } else {
    target.setCustomValidity('');
  }
});

