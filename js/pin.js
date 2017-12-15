'use strict';

(function () {
  /**
 * Максимальное количество пинов.
 * @type {Number}
 */
  var MAX_PIN_NUMBER = 5;

  /**
   * Функция фильтрации объектов по значению.
   * @param  {Array} arr         Массив объектов.
   * @param  {Node} filterField Поле фильтра.
   * @param  {string} type        Тип фильтра.
   * @return {Array}             Отфильтрованный массив.
   */
  var filterByValue = function (arr, filterField, type) {
    arr = arr.filter(function (obj) {
      if (filterField.value === 'any') {
        return true;
      } else {
        return obj.offer[type].toString() === filterField.value;
      }
    });

    return arr;
  };

  /**
   * Функция фильтрации объектов по цене.
   * @param  {Array} arr         Массив объектов.
   * @param  {Node} filterField Поле фильтра.
   * @param  {string} type        Тип фильтра.
   * @return {Array}             Отфильтрованный массив.
   */
  var filterByPrice = function (arr, filterField, type) {
    arr = arr.filter(function (obj) {
      switch (filterField.value) {
        case 'low':
          return obj.offer[type] <= 10000;
        case 'middle':
          return obj.offer[type] > 10000 && obj.offer[type] < 50000;
        case 'high':
          return obj.offer[type] >= 50000;
        default:
          return true;
      }
    });

    return arr;
  };

  /**
   * Функция фильтрации объектов по удобствам.
   * @param  {Array} arr          Массив объектов.
   * @param  {Node} filterFields Поле фильтра.
   * @return {Array}             Отфильтрованный массив.
   */
  var filterFeatures = function (arr, filterFields) {
    filterFields.forEach(function (item) {
      if (item.checked) {
        var value = item.id.slice(7);

        arr = arr.filter(function (obj) {
          return obj.offer['features'].indexOf(value) > -1;
        });
      }
    });

    return arr;
  };

  /**
   * Создает DOM-узел метки объекта.
   * @param  {Object} object
   * @return {Node} DOM-узел метки.
   */
  var render = (function () {
    var template = document.querySelector('template').content;
    var pin = template.querySelector('.map__pin').cloneNode(true);
    var pinCircleHeight = 62;
    var pinArrowHeight = 22;

    return function (object) {
      var pinElement = pin.cloneNode(true);

      pinElement.style.left = object.location.x + 'px';
      pinElement.style.top = object.location.y - (pinCircleHeight / 2 + pinArrowHeight) + 'px';
      pinElement.querySelector('img').src = object.author.avatar;

      pinElement.addEventListener('click', function (evt) {
        var currentPin = evt.target.closest('.map__pin');
        window.showCard(currentPin, object);
      });

      return pinElement;
    };
  })();

  window.pin = {
    /**
     * Фильтрует объекты в соответствии с выбранными фильтрами, создает DocumentFragment с отфильтрованными метками.
     * @param  {Array} objects
     * @return {HTMLElement} DocumentFragment с метками.
     */
    filter: function (objects) {
      var typeFilter = document.getElementById('housing-type');
      var priceFilter = document.getElementById('housing-price');
      var roomsFilter = document.getElementById('housing-rooms');
      var guestsFilter = document.getElementById('housing-guests');
      var featuresField = document.getElementById('housing-features');
      var featuresFilter = featuresField.querySelectorAll('input[name="features"');

      var filteredPins = objects;

      // Последовательно фильтрует объекты по выбранным полям.
      filteredPins = filterByValue(filteredPins, typeFilter, 'type');
      filteredPins = filterByValue(filteredPins, roomsFilter, 'rooms');
      filteredPins = filterByValue(filteredPins, guestsFilter, 'guests');
      filteredPins = filterByPrice(filteredPins, priceFilter, 'price');
      filteredPins = filterFeatures(filteredPins, featuresFilter);

      if (filteredPins.length > MAX_PIN_NUMBER) {
        filteredPins = filteredPins.slice(0, MAX_PIN_NUMBER);
      }

      var objectsFragment = window.pin.show(filteredPins);

      return objectsFragment;
    },

    /**
     * Создает DocumentFragment с метками объектов.
     * @param  {Array} objects
     * @return {HTMLElement} DocumentFragment с метками.
     */
    show: function (objects) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < objects.length; i++) {
        fragment.appendChild(render(objects[i]));
      }

      return fragment;
    }
  };

})();
