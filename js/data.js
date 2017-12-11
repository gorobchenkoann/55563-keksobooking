'use strict';

(function () {
  /**
 * Количество объявлений.
 * @type {Number}
 */
  var OFFER_NUMBER = 8;

  /**
   * Заголовки объявлений.
   * @type {Array}
   */
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  /**
   * Типы объектов.
   * @type {Array}
   */
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];

  /**
   * Время заезда и отъезда.
   * @type {Array}
   */
  var TIMES = ['12:00', '13:00', '14:00'];

  /**
   * Удобства.
   * @type {Array}
   */
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  /**
   * Типы жилья с переводом на русский.
   * @type {Object}
   */
  var OFFER_TYPES_RUSSIAN = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  /**
   * @param  {number} min
   * @param  {number} max
   * @return {number} Случайное число в заданном диапазоне.
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * @param  {Array} arr
   * @return {string|number} Случайный элемент входного массива.
   */
  var getRandomItem = function (arr) {
    /**
     * Случайный индекс.
     * @type {number}
     */
    var index = Math.floor(Math.random() * arr.length);

    return arr[index];
  };

  /**
   * @param  {Array} arr
   * @return {Array} Массив случайной длины.
   */
  var getRandomArray = function (arr) {
    /**
     * Случайный индекс.
     * @type {number}
     */
    var index = Math.floor(Math.random() * arr.length);

    return arr.slice(index);
  };

  window.data = {
    /**
     * Создает массив объектов с объявлениями.
     * @return {Object}
    */
    createObjects: function () {
      var objects = [];

      for (var i = 0; i < OFFER_NUMBER; i++) {
        var locationX = getRandomNumber(300, 900);
        var locationY = getRandomNumber(100, 500);

        objects.push({
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': OFFER_TITLES[i],
            'address': locationX + ', ' + locationY,
            'price': getRandomNumber(1000, 1000000),
            'type': OFFER_TYPES_RUSSIAN[getRandomItem(OFFER_TYPES)],
            'rooms': getRandomNumber(1, 5),
            'guests': getRandomNumber(1, 20),
            'checkin': getRandomItem(TIMES),
            'checkout': getRandomItem(TIMES),
            'features': getRandomArray(FEATURES),
            'description': '',
            'photos': []
          },
          'location': {
            x: locationX,
            y: locationY
          }
        });
      }

      return objects;
    }
  };

})();
