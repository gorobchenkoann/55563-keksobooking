'use strict';

(function () {
  /**
   * Создает DOM-узел метки объекта.
   * @param  {Object} object
   * @return {Node} DOM-узел метки.
   */
  var render = function () {
    var template = document.querySelector('template').content;
    var pin = template.querySelector('.map__pin').cloneNode(true);
    var pinCircleHeight = 44;
    var pinArrowHeight = 18;

    return function (object, index) {
      var pinElement = pin.cloneNode(true);

      pinElement.style.left = object.location.x + 'px';
      pinElement.style.top = object.location.y - (pinCircleHeight / 2 + pinArrowHeight) + 'px';
      pinElement.querySelector('img').src = object.author.avatar;
      pinElement.dataset.index = index;

      return pinElement;
    };
  }();

  window.pin = {
    /**
     * Создает DocumentFragment с метками объектов.
     * @param  {Array} objects
     * @return {HTMLElement} DocumentFragment с метками.
     */
    show: function (objects) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < objects.length; i++) {
        fragment.appendChild(render(objects[i], i));
      }

      return fragment;
    }
  };

})();
