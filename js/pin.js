'use strict';

(function () {
  /**
 * Максимальное количество пинов.
 * @type {Number}
 */
  var MAX_PIN_NUMBER = 5;

  var FEATURE_VALUE_LENGTH = 7;

  var ANY_VALUE = 'any';

  var Prices = {
    MIN: 10000,
    MAX: 50000
  }

  /**
   * Высоты элементов главного пина.
   * @type {Object}
   */
  var MainPinHeights = {
    CIRCLE: 62,
    ARROW: 22
  };

  /**
   * Функция фильтрации объектов по значению.
   * @param  {Array} arr         Массив объектов.
   * @param  {Node} filterField Поле фильтра.
   * @param  {string} type        Тип фильтра.
   * @return {Array}             Отфильтрованный массив.
   */
  var filterByValue = function (arr, filterField, type) {
    arr = arr.filter(function (obj) {
      return (filterField.value === ANY_VALUE) || (obj.offer[type].toString() === filterField.value);
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
          return obj.offer[type] <= Prices.MIN;
        case 'middle':
          return obj.offer[type] > Prices.MIN && obj.offer[type] < Prices.MAX;
        case 'high':
          return obj.offer[type] >= Prices.MAX;
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
        var value = item.id.slice(FEATURE_VALUE_LENGTH);

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

    return function (object) {
      var pinElement = pin.cloneNode(true);

      pinElement.style.left = object.location.x + 'px';
      pinElement.style.top = object.location.y - (MainPinHeights.CIRCLE / 2 + MainPinHeights.ARROW) + 'px';
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
      var typeFilter = document.querySelector('#housing-type');
      var priceFilter = document.querySelector('#housing-price');
      var roomsFilter = document.querySelector('#housing-rooms');
      var guestsFilter = document.querySelector('#housing-guests');
      var featuresField = document.querySelector('#housing-features');
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

      objects.forEach(function (object) {
        fragment.appendChild(render(object));
      });

      return fragment;
    }
  };

})();
