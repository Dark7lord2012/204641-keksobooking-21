'use strict';

const TIMEOUT_IN_MS = 10000;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;

let StatusCode = {
  OK: 200
};

const MethodRequest = {
  GET: `GET`,
  POST: `POST`
};

const connect = (method, URL, onXhrLoad, onXhrError, data = null) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, URL);
  xhr.send(data);


  xhr.addEventListener(`load`, onXhrLoad);
  xhr.addEventListener(`error`, onXhrError);
  xhr.addEventListener(`timeout`, () => {
    onXhrError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });
};

const upload = (onSuccess, onError) => {
  connect(MethodRequest.GET, URL_UPLOAD, (evt) => {
    const xhr = evt.target;

    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  }, () => {
    onError(`Произошла ошибка соединения`);
  });
};

const save = (onSuccess, onError, data) => {
  connect(MethodRequest.POST, URL_SAVE, (evt) => {
    const xhr = evt.target;

    if (xhr.status === StatusCode.OK) {
      onSuccess();
    } else {
      onError();
    }
  }, () => {
    onError();
  }, data);
};

window.network = {
  upload,
  save
};
