'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var avatarFileChooser = document.querySelector('.notice__photo input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');

  var photoDropZone = document.querySelector('.form__photo-container .drop-zone');
  var photoFileChooser = document.querySelector('.form__photo-container input[type="file"]');
  var photoPreview = document.querySelector('.form__photo-container');

  var loadFunction = function (evt) {
    evt.preventDefault();

    // Обработчик загрузки аватарки.
    var avatarLoadHandler = function () {
      avatarPreview.src = reader.result;
    };

    // Обработик загрузки фото объявления.
    var photoLoadHandler = function () {
      var img = document.createElement('img');
      img.src = reader.result;
      img.style.width = '100%';
      img.style.height = 'auto';
      photoPreview.appendChild(img);
    };

    // Тип загружаемого фото.
    var type = evt.type === 'drop' ? evt.target.htmlFor : evt.target.id;

    // Тип обработчика события загрузки фото.
    var loadHandler = type === 'avatar' ? avatarLoadHandler : photoLoadHandler;

    // Поле загрузки файлов.
    var dropZone = type === 'avatar' ? avatarFileChooser : photoFileChooser;

    var file = evt.type === 'drop' ? evt.dataTransfer.files[0] : dropZone.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', loadHandler, true);

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener('change', loadFunction, true);
  photoFileChooser.addEventListener('change', loadFunction, true);

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  }, true);

  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  }, true);

  avatarDropZone.addEventListener('drop', loadFunction, true);
  photoDropZone.addEventListener('drop', loadFunction, true);

})();
