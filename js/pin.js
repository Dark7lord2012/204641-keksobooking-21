'use strict';

(() => {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`button`);
  const mainPin = document.querySelector(`.map__pin--main`);
  let locationX = parseInt(mainPin.style.left, 10);
  let locationY = parseInt(mainPin.style.top, 10);
  const addressMainPin = document.querySelector(`#address`);
  const widthMainPin = mainPin.offsetWidth;
  const heightMainPin = mainPin.offsetHeight;
  addressMainPin.value = `${Math.round(locationX + (widthMainPin / 2))}, ${Math.round(locationY + (heightMainPin / 2))}`;

  const removeChildrenNode = window.data.removeChildrenNode;
  const mapFilters = window.map.mapFilters;
  const mapFeatures = window.map.mapFeatures;
  const adFormHeader = window.map.adFormHeader;
  const adFormElements = window.map.adFormElements;
  const mapPins = window.data.mapPins;
  const showCardPopup = window.card.showCardPopup;

  const renderPin = (pin) => {
    let pinElement = templatePin.cloneNode(true);
    let pinImg = pinElement.querySelector(`img`);
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - (pinElement.offsetWidth / 2)}px`;
    pinElement.style.top = `${pin.location.y - pinElement.offsetHeight}px`;

    return pinElement;
  };

  const activateForms = () => {
    // Координаты и размеры метки (в активном состоянии)
    mainPin.style.transform = `translateY(-100%)`;
    // Убираем отключение активных элементов, написанные выше
    document.querySelector(`.map`).classList.remove(`map--faded`);
    mapFeatures.disabled = false;
    for (let filter of mapFilters) {
      filter.disabled = false;
    }
    const adForm = document.querySelector(`.ad-form`);
    adForm.classList.remove(`ad-form--disabled`);
    adFormHeader.disabled = false;
    for (let element of adFormElements) {
      element.disabled = false;
    }
    // Генерация и отрисовка метки
    const successHandler = (apartments) => {
      let data = apartments;
      // Отфильтрование квартир по типа и ограничение размера
      let filtered = window.filter.filterType(data);
      apartments = filtered;

      for (let i = 0; i < apartments.length; i++) {
        const pin = apartments[i];
        const pinElement = renderPin(pin);
        fragment.appendChild(pinElement);

        pinElement.addEventListener(`click`, () => {
          showCardPopup(pin);
        });
      }

      removeChildrenNode(mapPins, mainPin); // Очистка от старых меток
      mapPins.appendChild(fragment);
    };

    const errorHandler = (errorMessage) => {
      const node = document.createElement(`div`);

      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(240, 0, 0, 0.3);`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.color = `white`;
      node.style.fontSize = `20px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    };

    const fragment = document.createDocumentFragment();
    window.network.upload(successHandler, errorHandler);
  };


  const onFormsActivateMousedown = (evt) => {
    if (evt.button === 0) {
      activateForms();
      mainPin.removeEventListener(`mousedown`, onFormsActivateMousedown);
      mainPin.removeEventListener(`keydown`, onFormsActivateKeydown);
    }
  };

  const onFormsActivateKeydown = (evt) => {
    if (evt.key === `Enter`) {
      activateForms();
      mainPin.removeEventListener(`mousedown`, onFormsActivateMousedown);
      mainPin.removeEventListener(`keydown`, onFormsActivateKeydown);
    }
  };

  mainPin.addEventListener(`mousedown`, onFormsActivateMousedown);
  mainPin.addEventListener(`keydown`, onFormsActivateKeydown);

  window.pin = {
    templatePin,
    mainPin,
    renderPin,
    activateForms,
    onFormsActivateMousedown,
    onFormsActivateKeydown
  };
})();
