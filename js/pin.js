'use strict';

const MAP_RANGE_TOP = window.data.MAP_RANGE_TOP;
const MAP_RANGE_BOTTOM = window.data.MAP_RANGE_BOTTOM;

const templatePin = document.querySelector(`#pin`).content.querySelector(`button`);
const mainPin = document.querySelector(`.map__pin--main`);
const addressMainPin = document.querySelector(`#address`);

const removeChildrenNode = window.data.removeChildrenNode;
const mapFilters = window.map.mapFilters;
const mapFeatures = window.map.mapFeatures;
const adFormHeader = window.map.adFormHeader;
const adFormElements = window.map.adFormElements;
const mapPins = window.data.mapPins;
const showCardPopup = window.card.showCardPopup;
const mapWidth = window.data.mapWidth;

const calculateAddress = (pin, inputAddress) => {
  const x = parseInt(pin.style.left, 10);
  const y = parseInt(pin.style.top, 10);
  const widthPin = pin.offsetWidth;
  const heightPin = pin.offsetHeight;
  inputAddress.value = `${Math.round(x + (widthPin / 2))}, ${Math.round(y + (heightPin / 2))}`;
};

calculateAddress(mainPin, addressMainPin);

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
  // Координата теперь не в середине, а в остром конце метки
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

  // Скачивание и отрисовка меток
  const fragment = document.createDocumentFragment();

  const successHandler = (apartments) => {
    let data = apartments;
    // Отфильтрование квартир по типа и ограничение размера
    let filtered = window.filter.filterAllOptions(data);
    filtered = filtered.slice(0, 5);
    apartments = filtered;

    for (let i = 0; i < apartments.length; i++) {
      const pin = apartments[i];

      // Согласно ТЗ 5.3 меткам без поля offer рендер не разрешен
      if (pin.offer) {
        const pinElement = renderPin(pin);
        fragment.appendChild(pinElement);

        pinElement.addEventListener(`click`, () => {
          showCardPopup(pin);
        });
      }

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

  window.network.upload(successHandler, errorHandler);
};

// Активация форм по нажатию
const onFormsActivateMousedown = (evt) => {
  if (evt.button === 0) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let diffY = mainPin.offsetTop - shift.y;
      let diffX = mainPin.offsetLeft - shift.x;

      if (diffY < MAP_RANGE_TOP) {
        diffY = MAP_RANGE_TOP;
      }

      if (diffY > MAP_RANGE_BOTTOM) {
        diffY = MAP_RANGE_BOTTOM;
      }

      if (diffX < 0) {
        diffX = 0;
      }
      if (diffX > mapWidth) {
        diffX = mapWidth;
      }

      mainPin.style.top = `${diffY}px`;
      mainPin.style.left = `${diffX}px`;
    };

    const onMouseUp = () => {
      activateForms();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      calculateAddress(mainPin, addressMainPin);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
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

const removePins = (pins, except) => {
  window.data.removeChildrenNode(pins, except);
};

window.pin = {
  templatePin,
  mainPin,
  renderPin,
  activateForms,
  onFormsActivateMousedown,
  onFormsActivateKeydown,
  removePins
};
