'use strict';

(function () {
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
   * @return {[type]} Измененное второе поле.
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
   * @return {[type]} Измененное поле цены.
   */
  var syncMinPrice = function (type, price) {
    var minPrice = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    var typeValue = type.value;
    price.min = minPrice[typeValue];

    return price;
  };

  /**
   * При изменении значения первого поля, меняет значение второго.
   * @param  {[type]} rooms
   * @param  {[type]} capacity
   * @return {[type]} Измененное значение второго поля.
   */
  var syncCapacity = function (rooms, capacity) {
    var roomsNumber = rooms.value;
    var guestsNumbers = capacity.options;

    for (var i = 0; i < guestsNumbers.length; i++) {
      if (roomsNumber === '100') {
        guestsNumbers[i].disabled = guestsNumbers[i].value !== '100';
        capacity.value = '0';
      } else {
        guestsNumbers[i].disabled = (guestsNumbers[i].value > roomsNumber || guestsNumbers[i].value === '0');
        capacity.value = roomsNumber;
      }
    }

    return capacity;
  };

  timeinInput.addEventListener('change', function () {
    syncInputs(timeinInput, timeoutInput);
  }, true);

  timeoutInput.addEventListener('change', function () {
    syncInputs(timeoutInput, timeinInput);
  }, true);

  typeInput.addEventListener('change', function () {
    syncMinPrice(typeInput, priceInput);
  }, true);

  roomNumberInput.addEventListener('change', function () {
    syncCapacity(roomNumberInput, capacityInput);
  }, true);

  // Дополнительная валидация заголовка для браузеров, не поддерживающих minlength.
  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Минимально допустимое количество символов: 30. Длина текста сейчас: ' + target.value.length + '.');
    } else {
      target.setCustomValidity('');
    }
  }, true);

  // Синхронизация количества комнат и гостей.
  syncCapacity(roomNumberInput, capacityInput);

})();
