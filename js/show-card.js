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

  window.showCard = {
    open: function (currentPin, objects) {
      var activePin = mapPinsBlock.querySelector('.map__pin--active');

      // Закрывает предыдущее объявление, деактивирует пин.
      if (activePin) {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapPinsBlock.removeChild(mapCard);
        }
        activePin.classList.remove('map__pin--active');
      }

      // Активирует текущий пин.
      if (currentPin) {
        currentPin.classList.add('map__pin--active');

        // Открывает объявление, если текущий пин не главный.
        if (!currentPin.classList.contains('map__pin--main')) {
          var pinIndex = currentPin.dataset.index;
          var popup = window.card.renderPopup(objects[pinIndex]);

          mapPinsBlock.appendChild(popup);
          popupOpen();
        }
      }
    }
  };

})();
