'use strict';

(function () {
  /**
   * Высоты элементов главного пина.
   * @type {Object}
   */
  var MainPinHeights = {
    CIRCLE: 62,
    ARROW: 22
  };

  /**
   * Ширина главного пина.
   * @type {Number}
   */
  var MAIN_PIN_WIDTH = 62;

  /**
   * Границы значения координаты Y.
   * @type {Object}
   */
  var BordersY = {
    TOP: 100,
    BOTTOM: 500
  };

  /**
   * Максимальное количество пинов.
   * @type {Number}
   */
  var MAX_PIN_NUMBER = 5;
  /**
   * Границы значения координаты Y с учетом размеров пина.
   * @type {Object}
   */
  var PinConstraintsY = {
    TOP: BordersY.TOP - (MainPinHeights.CIRCLE / 2 + MainPinHeights.ARROW),
    BOTTOM: BordersY.BOTTOM - (MainPinHeights.CIRCLE / 2 + MainPinHeights.ARROW)
  };

  // Делает форму и ее поля активными.
  var activateForm = function () {
    var form = document.querySelector('.notice__form');
    var fieldsets = form.querySelectorAll('fieldset');

    form.classList.remove('notice__form--disabled');

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  // Удаляет с карты все пины, закрывает карточку объявления, если она открыта.
  var clearMap = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');

    Array.prototype.forEach.call(pins, function (pin) {
      mapPinsBlock.removeChild(pin);
    });

    if (card) {
      mapPinsBlock.removeChild(card);
    }
  };

  // Обработчик нажатия на главный пин.
  var mainPinMouseUpHandler = function (evt) {
    // Удаляет обработчик события mouseup у главной метки.
    var pin = evt.currentTarget;
    pin.removeEventListener('mouseup', mainPinMouseUpHandler);

    // Показывает блок карты.
    var mapWindow = document.querySelector('.map');
    mapWindow.classList.remove('map--faded');

    // Отрисовывает метки похожих объектов.
    var objectsFragment = window.pin.show(objects.slice(0, MAX_PIN_NUMBER));
    mapPinsBlock.appendChild(objectsFragment);

    activateForm();
  };

  /**
   * Функция загрузки данных.
   * @param  {Object} loadData
   */
  var successHandler = function (loadData) {
    objects = loadData;
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler, true);
  };

  var filterChangeHandler = function () {
    var pins = window.pin.filter(objects);
    clearMap();
    mapPinsBlock.appendChild(pins);
  };

  // Массив для загруженных объектов.
  var objects = [];

  // Главная меткаю
  var mainPin = document.querySelector('.map__pin--main');

  // Блок меткок объектов.
  var mapPinsBlock = document.querySelector('.map__pins');

  // Форма фильтров.
  var mapFilters = document.querySelector('.map__filters');

  var BordersX = {
    left: 0,
    right: mapPinsBlock.clientWidth
  };

  var PinConstraintsX = {
    left: BordersX.left + MAIN_PIN_WIDTH / 2,
    right: BordersX.right - MAIN_PIN_WIDTH / 2
  };

  // Обработчик выбора фильтров.
  mapFilters.addEventListener('change', function () {
    window.debounce(filterChangeHandler);
  }, true);

  // Обработчик перетаскивания главного пина.
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Координаты начала перетаскивания.
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      // Смещение.
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Проверка попадания пина в заданые границы по горизонтали.
      if ((mainPin.offsetLeft - shift.x) >= PinConstraintsX.left && (mainPin.offsetLeft - shift.x) <= PinConstraintsX.right) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      // Проверка попадания пина в заданые границы по вертикали.
      if ((mainPin.offsetTop - shift.y) >= PinConstraintsY.TOP && (mainPin.offsetTop - shift.y) <= PinConstraintsY.BOTTOM) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      var coordY = (mainPin.offsetTop - shift.y) + (MainPinHeights.CIRCLE / 2 + MainPinHeights.ARROW);
      var adressInput = document.getElementById('address');
      adressInput.value = 'x: ' + (mainPin.offsetLeft - shift.x) + ', y: ' + coordY;
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      mainPin.classList.remove('map__pin--active');

      document.removeEventListener('mousemove', mouseMoveHandler, true);
      document.removeEventListener('mouseup', mouseUpHandler, true);
    };

    mainPin.classList.add('map__pin--active');
    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, true);

  }, true);

  window.backend.load(successHandler, window.backend.errorHandler);

  window.map = {
    getMainPinCoords: function () {
      return {
        x: mainPin.offsetLeft,
        y: mainPin.offsetTop + (MainPinHeights.CIRCLE / 2 + MainPinHeights.ARROW)
      };
    }
  };

})();
