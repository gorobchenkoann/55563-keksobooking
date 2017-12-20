'use strict';

(function () {
  /**
   * URL сервера.
   * @type {String}
   */
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  /**
   * Сообщения об ошибках в зависимости от кода ответа.
   * @type {Object}
   */
  var ErrorMessages = {
    400: 'Неверный запрос',
    403: 'Доступ запрещен',
    404: 'Страница не найдена',
    500: 'Ошибка сервера'
  };

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorMessages[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; padding: 50px; transform: translate(-50%, -50%); text-align: center; background-color: white; border: 4px solid red; border-radius: 10px';
      node.style.position = 'fixed';
      node.style.left = '50%';
      node.style.top = '50%';
      node.style.width = '300px';
      node.style.height = '40px';
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(function () {
        node.parentNode.removeChild(node);
      }, 1000);
    }
  };
})();
