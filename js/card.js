'use strict';

(function () {
  /**
   * Создает DOM-узел списка удобств.
   * @param  {Array} features
   * @return {Node} DOM-узел списка удобств.
   */
  var renderFeatures = function (features) {
    var featuresList = '';

    for (var i = 0; i < features.length; i++) {
      featuresList += '<li class="feature feature--' + features[i] + '"></li>';
    }

    return featuresList;
  };

  window.card = {
    /**
     * Создает DOM-узел описания объекта.
     * @param  {Object} object
     * @return {Node} DOM-узел описания объекта.
     */
    renderOffer: function (object) {
      var template = document.querySelector('template').content;
      var offerArticle = template.querySelector('.map__card').cloneNode(true);

      offerArticle.querySelector('h3').textContent = object.offer.title;
      offerArticle.querySelector('p').textContent = object.offer.address;
      offerArticle.querySelector('.popup__price').textContent = object.offer.price + '\t\u20BD/ночь';
      offerArticle.querySelector('h4').textContent = object.offer.type;
      offerArticle.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
      offerArticle.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      offerArticle.querySelector('.popup__features').innerHTML = renderFeatures(object.offer.features);
      offerArticle.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
      offerArticle.querySelector('.popup__avatar').src = object.author.avatar;
      offerArticle.classList.add('hidden');

      return offerArticle;
    },

    /**
     * Создает фрагмент описания объекта.
     * @param  {Object} object
     * @return {Node} Фрагмент описания объекта.
     */
    renderPopup: function (object) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(this.renderOffer(object));

      return fragment;
    }
  };

})();
