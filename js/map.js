'use strict';

(function () {
  /**
   * Код клавиши Escape.
   * @type {Number}
   */
  var ESC_KEYCODE = 27;

  /**
   * Высоты элементов главного пина.
   * @type {Object}
   */
  var MAIN_PIN_HEIGHTS = {
    circle: 62,
    arrow: 22
  };

  var MAIN_PIN_WIDTH = 62;

  /**
   * Границы значения координаты Y.
   * @type {Object}
   */
  var Y_BORDERS = {
    top: 100,
    bottom: 500
  };

  /**
   * Границы значения координаты Y с учетом размеров пина.
   * @type {Object}
   */
  var PIN_CONSTRAINTS_Y = {
    top: Y_BORDERS.top - (MAIN_PIN_HEIGHTS.circle / 2 + MAIN_PIN_HEIGHTS.arrow),
    bottom: Y_BORDERS.bottom - (MAIN_PIN_HEIGHTS.circle / 2 + MAIN_PIN_HEIGHTS.arrow)
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

  /**
   * Добавляет новую активную метку, убирает предыдущую.
   * @param  {HTMLElement} currentPin
   */
  var activatePin = function (currentPin) {
    popupClose();
    currentPin.classList.add('map__pin--active');
  };

  var popupOpen = function () {
    var mapCard = document.querySelector('.map__card');
    var closeButton = mapCard.querySelector('.popup__close');

    mapCard.classList.remove('hidden');
    closeButton.addEventListener('click', popupClose, true);

    document.addEventListener('keydown', popupEscPressHandler, true);
  };

  var popupClose = function () {
    var activePin = mapPinsBlock.querySelector('.map__pin--active');
    var mapCard = document.querySelector('.map__card');

     if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    if (mapCard) {
      mapPinsBlock.removeChild(mapCard);
    }

    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupClose();
    }
  };

  var pinMouseUpHandler = function (evt) {
    // Удаляет обработчик события mouseup у главной метки.
    var pin = evt.currentTarget;
    pin.removeEventListener('mouseup', pinMouseUpHandler);

    // Показывает блок карты.
    var mapWindow = document.querySelector('.map');
    mapWindow.classList.remove('map--faded');

    // Отрисовывает метки похожих объектов.
    var objectsFragment = window.pin.show(objects);
    mapPinsBlock.appendChild(objectsFragment);

    activateForm();
  };

  /**
   * Обработчик события нажатия на метку.
   * Нажатие на метку с модификатором --main вызывает только ее активацию,
   * но не появление всплывающего окна.
   * @param  {Event} evt
   */
  var pinClickHandler = function (evt) {
    var target = evt.target;
    var currentPin = target.closest('.map__pin');

    if (currentPin) {
      activatePin(currentPin);

      if (!currentPin.classList.contains('map__pin--main')) {
        var pinIndex = currentPin.dataset.index;
        var popup = window.card.renderPopup(objects[pinIndex]);

        mapPinsBlock.appendChild(popup);
        popupOpen();
      }
    }
  };

  // Массив объектов объявлений.
  var objects = window.data.createObjects();

  // Главная меткаю
  var mainPin = document.querySelector('.map__pin--main');

  // Блок меткок объектов.
  var mapPinsBlock = document.querySelector('.map__pins');

  var xBorders = {
    left: 0,
    right: mapPinsBlock.clientWidth
  };

  var pinConstraintsX = {
    left: xBorders.left + MAIN_PIN_WIDTH / 2,
    right: xBorders.right - MAIN_PIN_WIDTH / 2
  }

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
      if ((mainPin.offsetLeft - shift.x) >= pinConstraintsX.left && (mainPin.offsetLeft - shift.x) <= pinConstraintsX.right) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      // Проверка попадания пина в заданые границы по вертикали.
      if ((mainPin.offsetTop - shift.y) >= PIN_CONSTRAINTS_Y.top && (mainPin.offsetTop - shift.y) <= PIN_CONSTRAINTS_Y.bottom) {
        var coordY = (mainPin.offsetTop - shift.y) + (MAIN_PIN_HEIGHTS.circle / 2 + MAIN_PIN_HEIGHTS.arrow);
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

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

  });

  mainPin.addEventListener('mouseup', pinMouseUpHandler, true);
  mapPinsBlock.addEventListener('click', pinClickHandler, true);

})();
