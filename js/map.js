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

  var successHandler = function (loadData) {
    var objectsFragment = window.pin.show(loadData);

    // Открытие объявлений по клику на пин.
    mapPinsBlock.addEventListener('click', function (evt) {
      var target = evt.target;
      var currentPin = target.closest('.map__pin');

      window.showCard(currentPin, loadData);
    }, true);

    var pinMouseUpHandler = function (evt) {
      // Удаляет обработчик события mouseup у главной метки.
      var pin = evt.currentTarget;
      pin.removeEventListener('mouseup', pinMouseUpHandler);

      // Показывает блок карты.
      var mapWindow = document.querySelector('.map');
      mapWindow.classList.remove('map--faded');

      // Отрисовывает метки похожих объектов.
      mapPinsBlock.appendChild(objectsFragment);

      activateForm();
    };

    mainPin.addEventListener('mouseup', pinMouseUpHandler, true);
  };

  // Главная меткаю
  var mainPin = document.querySelector('.map__pin--main');

  // Блок меткок объектов.
  var mapPinsBlock = document.querySelector('.map__pins');

  var BordersX = {
    left: 0,
    right: mapPinsBlock.clientWidth
  };

  var PinConstraintsX = {
    left: BordersX.left + MAIN_PIN_WIDTH / 2,
    right: BordersX.right - MAIN_PIN_WIDTH / 2
  };

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

      document.removeEventListener('mousemove', mouseMoveHandler, true);
      document.removeEventListener('mouseup', mouseUpHandler, true);
    };

    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, true);

  }, true);

  window.backend.load(successHandler, window.backend.errorHandler);

})();
