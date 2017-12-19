'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarDropZone = document.querySelector('.notice__photo input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoDropZone =  document.querySelector('.form__photo-container input[type="file"]');
  var photoPreview = document.querySelector('.form__photo-container');

  var loadFunction = function (evt) {
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

    // Определяет тип загружаемого фото.
    var type = evt.target.id;
    var loadHandler = type === 'avatar' ? avatarLoadHandler : photoLoadHandler;
    var dropZone = type === 'avatar' ? avatarDropZone : photoDropZone;

    var file = dropZone.files[0];
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

  avatarDropZone.addEventListener('change', loadFunction, true);
  photoDropZone.addEventListener('change', loadFunction, true);

})();
