'use strict';

(() => {
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mapFeatures = document.querySelector(`.map__features`);
  const pins = document.querySelectorAll(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);
  const adFormHeader = document.querySelector(`.ad-form-header`);
  const adFormElements = document.querySelectorAll(`.ad-form__element`);

  const deactivateForms = () => {
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
})();
