'use strict';

let StatusCode = {
  OK: 200
};
let TIMEOUT_IN_MS = 10000;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;

const upload = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`GET`, URL_UPLOAD);
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

const save = (data, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`POST`, URL_SAVE);
  xhr.send(data);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      return onSuccess(true);
    } else {
      return onSuccess(xhr);
    }
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

window.network = {
  upload,
  save
};
