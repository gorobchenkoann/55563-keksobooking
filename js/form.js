'use strict';

(function () {

  var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var OFFER_PRICES = ['1000', '5000', '0', '10000'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];

  var titleInput = document.getElementById('title');
  var timeinInput = document.getElementById('timein');
  var timeoutInput = document.getElementById('timeout');
  var typeInput = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var roomNumberInput = document.getElementById('room_number');
  var capacityInput = document.getElementById('capacity');

  /**
   * Устанавливает значение аттрибута value для элемента.
   * @param  {Node} element
   * @param  {string|number} value
   */
  var syncValues = function (element, value) {
    element.value = value;
  };

  /**
   * Устанавливает значение аттрибута min для элемента.
   * @param  {Node} element
   * @param  {number} value
   */
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  /**
   * Устанавливает атрибут disable для неподходящих опций.
   * @param  {Node} rooms
   * @param  {Node} capacity
   * @return {Node} Список опций.
   */
  var disableCapacityFields = function (rooms, capacity) {
    var roomsNumber = rooms.value;
    var guestsNumbers = capacity.options;

    for (var i = 0; i < guestsNumbers.length; i++) {
      if (roomsNumber === '100') {
        guestsNumbers[i].disabled = guestsNumbers[i].value !== '100';
      } else {
        guestsNumbers[i].disabled = (guestsNumbers[i].value > roomsNumber || guestsNumbers[i].value === '0');
      }
    }

    return capacity;
  };

  timeinInput.addEventListener('change', function () {
    window.synchronizeFields(timeinInput, timeoutInput, OFFER_TIMES, OFFER_TIMES, syncValues);
  }, true);

  timeoutInput.addEventListener('change', function () {
    window.synchronizeFields(timeoutInput, timeinInput, OFFER_TIMES, OFFER_TIMES, syncValues);
  }, true);

  typeInput.addEventListener('change', function () {
    window.synchronizeFields(typeInput, priceInput, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);
  }, true);

  roomNumberInput.addEventListener('change', function () {
    window.synchronizeFields(roomNumberInput, capacityInput, ROOMS_NUMBERS, GUESTS_NUMBERS, syncValues);
    disableCapacityFields(roomNumberInput, capacityInput);
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
  window.synchronizeFields(roomNumberInput, capacityInput, ROOMS_NUMBERS, GUESTS_NUMBERS, syncValues);
  disableCapacityFields(roomNumberInput, capacityInput);

})();
