'use strict';

(function () {
  /**
   * Код клавиши Escape.
   * @type {Number}
   */
  var ESC_KEYCODE = 27;

  var mapPinsBlock = document.querySelector('.map__pins');

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupClose();
    }
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
    var activePin = mapPinsBlock.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    if (mapCard) {
      mapPinsBlock.removeChild(mapCard);
    }

    document.removeEventListener('keydown', popupEscPressHandler);
  };

  window.showCard = function (currentPin, object) {
    var activePin = mapPinsBlock.querySelector('.map__pin--active');
    var popup = window.card.renderPopup(object);

    // Закрывает предыдущее объявление, деактивирует пин.
    if (activePin) {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.parentNode.removeChild(mapCard);
      }
      activePin.classList.remove('map__pin--active');
    }

    currentPin.classList.add('map__pin--active');
    mapPinsBlock.appendChild(popup);
    popupOpen();
  };

})();
