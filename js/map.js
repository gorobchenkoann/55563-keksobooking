'use strict';

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

/**
 * @param  {string} name
 * @return {string} Тип жилья на русском.
 */
var getRussianName = function (name) {
  switch (name) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
  }
    return 'Дом';
};

/**
 * Создает массив объектов с объявлениями.
 * @return {Object}
 */
var createObjects = function () {
  /**
   * Пустой массив объектов.
   * @type {Array}
   */
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
        'type': getRandomItem(OFFER_TYPES),
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
};

/**
 * Создает разметку списка удобств.
 * @param  {Array} features
 * @return {string} Строка с разметкой списка удобств.
 */
var renderFeatures = function (features) {
  var featuresList = '';

  for (var i = 0; i < features.length; i++) {
    featuresList += '<li class="feature feature--' + features[i] + '"></li>';
  }

  return featuresList;
};

/**
 * Создает DOM-узел метки объекта.
 * @param  {Oblect} object
 * @return {HTMLElement} DOM-узел метки.
 */
var renderMapPin = function (object) {
  var pinElement = document.querySelector('.map__pin').cloneNode(true);
  var pinWidth = 70;
  var pinHeight = 70;

  pinElement.classList.remove('map__pin--main');
  pinElement.style.left = object.location.x - pinWidth / 2 + 'px';
  pinElement.style.top = object.location.y - pinHeight + 'px';
  pinElement.querySelector('img').src = object.author.avatar;

  return pinElement;
};

/**
 * Создает DOM-узел описания объекта.
 * @param  {Object} object
 * @return {HTMLElement} DOM-узел описания объекта.
 */
var renderOffer = function (object) {
  var template = document.querySelector('template').content;
  var offerArticle = template.querySelector('.map__card').cloneNode(true);

  offerArticle.querySelector('h3').textContent = object.offer.title;
  offerArticle.querySelector('p').textContent = object.offer.address;
  offerArticle.querySelector('.popup__price').innerHTML = object.offer.price + ' &#x20bd;/ночь';
  offerArticle.querySelector('h4').textContent = getRussianName(object.offer.type);
  offerArticle.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
  offerArticle.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  offerArticle.querySelector('.popup__features').innerHTML = renderFeatures(object.offer.features);
  offerArticle.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
  offerArticle.querySelector('.popup__avatar').src = object.author.avatar;

  return offerArticle;
};

/**
 * Создает DocumentFragment с метками объектов.
 * @param  {Array} objects
 * @return {HTMLElement} DocumentFragment с метками.
 */
var showMapPins = function (objects) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderMapPin(objects[i]));
  }

  return fragment;
};

// Показывает окно с похожими объектами.
var mapWindow = document.querySelector('.map');
mapWindow.classList.remove('map--faded');

// Блок метки объекта.
var mapPin = document.querySelector('.map__pins');

// Отрисовывает метки похожих объектов.
var objects = createObjects();
var objectsFragment = showMapPins(objects);
mapPin.appendChild(objectsFragment);

// Отрисовывает описание первого объекта.
var offer = renderOffer(objects[0]);
mapWindow.insertBefore(offer, mapPin);
