'use strict';

(() => {
  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const upload = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);
    xhr.send();

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  // upload(console.log, console.log);

  window.network = {
    upload
  };
})();
