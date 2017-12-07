'use strict';

(function () {
  /**
   * Код клавиши Escape.
   * @type {Number}
   */
  var ESC_KEYCODE = 27;

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
    var activePin = mapPinsBlock.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
      popupClose();
    }

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
    var mapCard = document.querySelector('.map__card');

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

  var mouseUpHandler = function (evt) {
    // Удаляет обработчик события mouseup у главной метки.
    var pin = evt.currentTarget;
    pin.removeEventListener('mouseup', mouseUpHandler);

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

  mainPin.addEventListener('mouseup', mouseUpHandler, true);
  mapPinsBlock.addEventListener('click', pinClickHandler, true);

})();
