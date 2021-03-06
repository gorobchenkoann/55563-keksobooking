'use strict';

(function () {

  var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var OFFER_PRICES = ['1000', '5000', '0', '10000'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];
  var CHILD_NODES_NUMBER = 2;
  var MIN_STRING_LENGTH = 30;

  var form = document.querySelector('.notice__form');
  var titleInput = document.querySelector('#title');
  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var description = document.querySelector('#description');
  var features = document.querySelectorAll('.features input[type="checkbox"]');

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
      if (roomsNumber === ROOMS_NUMBERS[3]) {
        guestsNumbers[i].disabled = guestsNumbers[i].value !== GUESTS_NUMBERS[3];
      } else {
        guestsNumbers[i].disabled = (guestsNumbers[i].value > roomsNumber || guestsNumbers[i].value === GUESTS_NUMBERS[3]);
      }
    }

    return capacity;
  };

  // Функция сброса полей формы.
  var formResetHandler = function () {
    var avatar = document.querySelector('.notice__preview img');
    var photoContainer = document.querySelector('.form__photo-container');
    var nodes = photoContainer.childNodes;

    // Удаляет дочерние элементы photoContainer, кроме области загрузки.
    while (nodes.length > CHILD_NODES_NUMBER) {
      photoContainer.removeChild(photoContainer.lastChild);
    }
    avatar.src = 'img/muffin.png';

    titleInput.value = '';
    typeInput.value = OFFER_TYPES[0];
    timeinInput.value = OFFER_TIMES[0];
    roomNumberInput.value = ROOMS_NUMBERS[0];
    description.value = '';
    Array.prototype.forEach.call(features, function (feature) {
      feature.checked = false;
    });

    window.setAdress();
    window.synchronizeFields(timeinInput, timeoutInput, OFFER_TIMES, OFFER_TIMES, syncValues);
    window.synchronizeFields(typeInput, priceInput, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);
    window.synchronizeFields(roomNumberInput, capacityInput, ROOMS_NUMBERS, GUESTS_NUMBERS, syncValues);
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
    if (target.value.length < MIN_STRING_LENGTH) {
      target.setCustomValidity('Минимально допустимое количество символов: 30. Длина текста сейчас: ' + target.value.length + '.');
    } else {
      target.setCustomValidity('');
    }
  }, true);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), formResetHandler, window.backend.errorHandler);
    evt.preventDefault();
  }, true);

  form.addEventListener('reset', function (evt) {
    evt.preventDefault();
    formResetHandler();
  }, true);

  // Синхронизация количества комнат и гостей.
  window.synchronizeFields(roomNumberInput, capacityInput, ROOMS_NUMBERS, GUESTS_NUMBERS, syncValues);
  disableCapacityFields(roomNumberInput, capacityInput);

})();
