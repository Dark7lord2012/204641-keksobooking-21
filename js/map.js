'use strict';


const map = document.querySelector(`.map`);
const mapFilters = map.querySelectorAll(`.map__filter`);
const mapFeatures = map.querySelector(`.map__features`);
const mapPins = map.querySelector(`.map__pins`);
const mainPin = mapPins.querySelector(`.map__pin--main`);
const pins = mapPins.querySelectorAll(`.map__pin`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);

const defaultCoordsPin = {
  x: mainPin.style.left,
  y: mainPin.style.top
};

const deactivateForms = () => {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  // Фильтры меток
  for (let filter of mapFilters) {
    filter.disabled = true;
  }
  // Метки
  mapFeatures.disabled = true;
  for (let pin of pins) {
    if (!pin.classList.contains(`map__pin--main`)) {
      pin.disabled = true;
    }
  }
  // Главной метке сброс координат
  mainPin.style.left = defaultCoordsPin.x;
  mainPin.style.top = defaultCoordsPin.y;
  // Форма объявления
  adFormHeader.disabled = true;
  for (let element of adFormElements) {
    element.disabled = true;
  }
};

deactivateForms();

window.map = {
  mapFilters,
  mapFeatures,
  pins,
  mapPins,
  adFormHeader,
  adFormElements,
  deactivateForms
};
