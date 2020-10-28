/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!***********************!*\
  !*** ./js/network.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const housingPrice = document.querySelector(`#housing-price`);
const housingType = document.querySelector(`#housing-type`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);

const checkboxWifi = document.querySelector(`#filter-wifi`);
const checkboxDishwasher = document.querySelector(`#filter-dishwasher`);
const checkboxParking = document.querySelector(`#filter-parking`);
const checkboxWasher = document.querySelector(`#filter-washer`);
const checkboxElevator = document.querySelector(`#filter-elevator`);
const checkboxConditioner = document.querySelector(`#filter-conditioner`);

const allOptions = `any`;
const Price = {
  LOW_MIDDLE: 10000,
  MIDDLE_HIGH: 50000
};

const filterType = (apartments) => {
  let filtered = apartments;

  if (housingType.value !== allOptions) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.type === housingType.value;
    });
  }

  return filtered;
};

const filterPrice = (apartments) => {
  let filtered = apartments;

  if (housingPrice.value !== allOptions) {
    if (housingPrice.value === `low`) {
      filtered = filtered.filter((apartment) => {
        return apartment.offer.price < Price.LOW_MIDDLE;
      });
    } else if (housingPrice.value === `middle`) {
      filtered = filtered.filter((apartment) => {
        return apartment.offer.price >= Price.LOW_MIDDLE
              && apartment.offer.price < Price.MIDDLE_HIGH;
      });
    } else if (housingPrice.value === `high`) {
      filtered = filtered.filter((apartment) => {
        return apartment.offer.price >= Price.MIDDLE_HIGH;
      });
    }
  }

  return filtered;
};

const filterRooms = (apartments) => {
  let filtered = apartments;

  if (housingRooms.value !== allOptions) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.rooms === parseInt(housingRooms.value, 10);
    });
  }

  return filtered;
};

const filterGuests = (apartments) => {
  let filtered = apartments;

  if (housingGuests.value !== allOptions) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.guests === parseInt(housingGuests.value, 10);
    });
  }

  return filtered;
};

const filterWifi = (apartments) => {
  let filtered = apartments;

  if (checkboxWifi.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`wifi`);
    });
  }

  return filtered;
};

const filterDishwasher = (apartments) => {
  let filtered = apartments;

  if (checkboxDishwasher.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`dishwasher`);
    });
  }

  return filtered;
};

const filterParking = (apartments) => {
  let filtered = apartments;

  if (checkboxParking.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`parking`);
    });
  }

  return filtered;
};

const filterWasher = (apartments) => {
  let filtered = apartments;

  if (checkboxWasher.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`washer`);
    });
  }

  return filtered;
};

const filterElevator = (apartments) => {
  let filtered = apartments;

  if (checkboxElevator.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`elevator`);
    });
  }

  return filtered;
};

const filterConditioner = (apartments) => {
  let filtered = apartments;

  if (checkboxConditioner.checked) {
    filtered = filtered.filter((apartment) => {
      return apartment.offer.features.includes(`conditioner`);
    });
  }

  return filtered;
};

const filterAllOptions = (apartments) => {
  let filtered = filterType(apartments);
  filtered = filterPrice(filtered);
  filtered = filterRooms(filtered);
  filtered = filterGuests(filtered);

  filtered = filterWifi(filtered);
  filtered = filterDishwasher(filtered);
  filtered = filterParking(filtered);
  filtered = filterWasher(filtered);
  filtered = filterElevator(filtered);
  filtered = filterConditioner(filtered);

  return filtered;
};

window.filter = {
  housingType,
  filterType,
  filterPrice,
  filterRooms,
  filterGuests,
  filterWifi,
  filterDishwasher,
  filterAllOptions
};


})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const AVATARS = [
  `img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`,
];

const TYPE_APARTMENT = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const TYPE_APARTMENT_RUSSIAN = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const CHECHKIN = [
  `12:00`,
  `13:00`,
  `14:00`
];

const CHECHKOUT = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

// Ограничения диапазона под картинку карты (для меток)
const MAP_RANGE_TOP = 130;
const MAP_RANGE_BOTTOM = 630;

const mapPins = document.querySelector(`.map__pins`);
const mapWidth = (document.querySelector(`.map__overlay`).offsetWidth - 20); // 20 - ширина полоски для прокрутки (предполагается)

const randomElementArray = (array) => {
  return array[Math.round(Math.random() * (array.length - 1))];
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomArray = (array, length = getRandomNumber(0, array.length - 1)) => {
  const newArray = array;
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Алгоритм Фишера-Йетса
    [array[i], array[j]] = [array[j], array[i]]; // Почитать в MDN про деструктурируещее присваивание (!)
  }

  return newArray.slice(0, length);
};

const removeChildrenNode = (node, except = null) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (except !== null) {
    node.appendChild(except);
  }
};

const generateApartments = (length) => {
  const apartments = [];

  for (let i = 0; i < length; i++) {
    apartments[i] = {
      author: {
        avatar: `${AVATARS[getRandomNumber(0, AVATARS.length - 1)]}`
      },
      offer: {
        title: `Cтрока, заголовок предложения`,
        address: `Площадь Сталина`,
        price: 1300,
        type: randomElementArray(TYPE_APARTMENT),
        rooms: getRandomNumber(1, 3), // не бывает 0 комнат для 0 гостей
        guests: getRandomNumber(1, 2),
        checkin: randomElementArray(CHECHKIN),
        checkout: randomElementArray(CHECHKOUT),
        features: getRandomArray(FEATURES),
        description: null,
        photos: getRandomArray(PHOTOS)
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(MAP_RANGE_TOP, MAP_RANGE_BOTTOM)
      }
    };
  }
  return apartments;
};

window.data = {
  AVATARS,
  TYPE_APARTMENT,
  TYPE_APARTMENT_RUSSIAN,
  CHECHKIN,
  CHECHKOUT,
  FEATURES,
  PHOTOS,
  MAP_RANGE_TOP,
  MAP_RANGE_BOTTOM,
  mapPins,
  mapWidth,
  randomElementArray,
  getRandomNumber,
  getRandomArray,
  removeChildrenNode,
  generateApartments
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const map = document.querySelector(`.map`);
const mapFilters = map.querySelectorAll(`.map__filter`);
const mapFeatures = map.querySelector(`.map__features`);
const mapPins = map.querySelector(`.map__pins`);
const pins = mapPins.querySelectorAll(`.map__pin`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);

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

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);
const TYPE_APARTMENT_RUSSIAN = window.data.TYPE_APARTMENT_RUSSIAN;
const removeChildrenNode = window.data.removeChildrenNode;
const mapFilterContainer = document.querySelector(`.map__filters-container`);
const map = document.querySelector(`.map`);

const renderCard = (card) => {
  const cardElement = templateCard.cloneNode(true);

  const popupTitle = cardElement.querySelector(`.popup__title`);
  popupTitle.textContent = card.offer.title;

  const popupAddress = cardElement.querySelector(`.popup__text--address`);
  popupAddress.textContent = card.offer.address;

  const popupPrice = cardElement.querySelector(`.popup__text--price`);
  popupPrice.textContent = `${card.offer.price}₽/ночь`;

  const popupType = cardElement.querySelector(`.popup__type`);
  popupType.textContent = TYPE_APARTMENT_RUSSIAN[card.offer.type];

  const popupCapacity = cardElement.querySelector(`.popup__text--capacity`);
  popupCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;

  const popupTime = cardElement.querySelector(`.popup__text--time`);
  popupTime.textContent = `Заезд после ${card.offer.checkin} выезд до ${card.offer.checkout}`; // мнемоника?

  // Фичи
  const popupFeatures = cardElement.querySelector(`.popup__features`);
  const feature = cardElement.querySelector(`.popup__feature`);

  removeChildrenNode(popupFeatures);

  for (let i = 0; i < card.offer.features.length; i++) {
    const featureElement = feature.cloneNode(true);
    featureElement.className = `popup__feature popup__feature--${card.offer.features[i]}`;
    popupFeatures.appendChild(featureElement);
  }

  const popupDescription = cardElement.querySelector(`.popup__description`);
  popupDescription.textContent = card.offer.description;

  // Фото
  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  const popupPhoto = cardElement.querySelector(`.popup__photo`);

  while (popupPhotos.firstChild) {
    popupPhotos.removeChild(popupPhotos.firstChild);
  }

  for (let i = 0; i < card.offer.photos.length; i++) {
    const photoElement = popupPhoto.cloneNode(true);
    photoElement.src = `${card.offer.photos[i]}`;
    popupPhotos.appendChild(photoElement);
  }

  const popupAvatar = cardElement.querySelector(`.popup__avatar`);
  popupAvatar.src = card.author.avatar;

  return cardElement;
};

const onBtnCloseCardClick = () => {
  closeCardPopup();
};

const onCardPopupKeydown = (evt) => {
  if (evt.key === `Escape`) {
    closeCardPopup();
  }
};

const showCardPopup = (pin) => {
  const card = renderCard(pin);
  const oldCard = document.querySelector(`.popup`);
  if (oldCard) {
    closeCardPopup();
  }
  map.insertBefore(card, mapFilterContainer);
  const btnCloseCard = card.querySelector(`.popup__close`);
  btnCloseCard.addEventListener(`click`, onBtnCloseCardClick);
  document.addEventListener(`keydown`, onCardPopupKeydown);
};

const closeCardPopup = () => {
  document.removeEventListener(`keydown`, onCardPopupKeydown);
  const btnCloseCard = document.querySelector(`.popup__close`);
  btnCloseCard.removeEventListener(`click`, onBtnCloseCardClick);
  const oldCard = document.querySelector(`.popup`);
  if (oldCard) {
    map.removeChild(oldCard);
  }
};

window.card = {
  renderCard,
  showCardPopup,
  closeCardPopup,
  onBtnCloseCardClick,
  onCardPopupKeydown
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
const MAP_RANGE_TOP = window.data.MAP_RANGE_TOP;
const MAP_RANGE_BOTTOM = window.data.MAP_RANGE_BOTTOM;
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
  const successHandler = (apartments) => {
    let data = apartments;
    // Отфильтрование квартир по типа и ограничение размера
    let filtered = window.filter.filterAllOptions(data);
    filtered = filtered.slice(0, 5);
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
      // mainPin.removeEventListener(`mousedown`, onFormsActivateMousedown);
      // mainPin.removeEventListener(`keydown`, onFormsActivateKeydown);
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

})();

(() => {
/*!***************************!*\
  !*** ./js/filter-form.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


// Создал как бы подмодуль для filter, так как оттуда я не могу
// вызвать функцию модуля pin, поэтому создал этот модуль
// который ниже модуля pin и из этого модуля могу спокойно вызвать
// activateForms()

const activateForms = window.pin.activateForms;
const closeCardPopup = window.card.closeCardPopup;

const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);

const filterWifi = document.querySelector(`#filter-wifi`);
const filterDishwasher = document.querySelector(`#filter-dishwasher`);
const filterParking = document.querySelector(`#filter-parking`);
const filterWasher = document.querySelector(`#filter-washer`);
const filterElevator = document.querySelector(`#filter-elevator`);
const filterConditioner = document.querySelector(`#filter-conditioner`);

// Придумать название, которое говорить что закрывает карточку при любом изменении фильтров
const onFilterChange = () => {
  window.debounce(activateForms)();

  const popup = document.querySelector(`.map__card`);
  if (popup) {
    closeCardPopup();
  }
};

housingType.addEventListener(`change`, onFilterChange);
housingPrice.addEventListener(`change`, onFilterChange);
housingRooms.addEventListener(`change`, onFilterChange);
housingGuests.addEventListener(`change`, onFilterChange);

filterWifi.addEventListener(`change`, onFilterChange);
filterDishwasher.addEventListener(`change`, onFilterChange);
filterParking.addEventListener(`change`, onFilterChange);
filterWasher.addEventListener(`change`, onFilterChange);
filterElevator.addEventListener(`change`, onFilterChange);
filterConditioner.addEventListener(`change`, onFilterChange);


})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const typeApartment = document.querySelector(`#type`);
const priceApartment = document.querySelector(`#price`);
const timeInApartment = document.querySelector(`#timein`);
const timeOutApartment = document.querySelector(`#timeout`);
const roomsApartment = document.querySelector(`#room_number`);
const capacityApartment = document.querySelector(`#capacity`);
const options = capacityApartment.querySelectorAll(`option`);
const adForm = document.querySelector(`.ad-form`);
const mapPins = document.querySelector(`.map__pins`);
const mainPin = mapPins.querySelector(`.map__pin--main`);

const setTypeApartment = () => {
  if (typeApartment.value === `bungalow`) {
    priceApartment.min = `0`;
    priceApartment.placeholder = `0`;
  } else if (typeApartment.value === `flat`) {
    priceApartment.min = `1000`;
    priceApartment.placeholder = `1000`;
  } else if (typeApartment.value === `house`) {
    priceApartment.min = `5000`;
    priceApartment.placeholder = `5000`;
  } else if (typeApartment.value === `palace`) {
    priceApartment.min = `10000`;
    priceApartment.placeholder = `10000`;
  }
};

const onTypeApartmentChange = () => {
  setTypeApartment();
};

typeApartment.addEventListener(`change`, onTypeApartmentChange);

// 2) Время заезда и уезда

const setTimeInApartment = () => {
  if (timeInApartment.value === `12:00`) {
    timeOutApartment.value = `12:00`;
  } else if (timeInApartment.value === `13:00`) {
    timeOutApartment.value = `13:00`;
  } else if (timeInApartment.value === `14:00`) {
    timeOutApartment.value = `14:00`;
  }
};

const setTimeOutApartment = () => {
  if (timeOutApartment.value === `12:00`) {
    timeInApartment.value = `12:00`;
  } else if (timeOutApartment.value === `13:00`) {
    timeInApartment.value = `13:00`;
  } else if (timeOutApartment.value === `14:00`) {
    timeInApartment.value = `14:00`;
  }
};

const onTimeInApartmentChange = () => {
  setTimeInApartment();
};
const onTimeOutApartmentChange = () => {
  setTimeOutApartment();
};

timeInApartment.addEventListener(`change`, onTimeInApartmentChange);
timeOutApartment.addEventListener(`change`, onTimeOutApartmentChange);

// 3) Количество комнат

const setRoomsApartment = () => {
  for (let option of options) {
    option.disabled = false; // Сброс disabled при повторном вызове
  }
  let selectedOption;

  if (roomsApartment.value === `1`) {
    for (let option of options) {
      if (option.value !== `1`) {
        option.disabled = true;
        option.selected = false;
      } else {
        selectedOption = option;
      }
    }
    selectedOption.selected = true;
  } else if (roomsApartment.value === `2`) {
    for (let option of options) {
      if (option.value !== `1`
        && option.value !== `2`) {
        option.disabled = true;
      } else {
        selectedOption = option;
      }
    }
    selectedOption.selected = true;
  } else if (roomsApartment.value === `3`) {
    for (let option of options) {
      if (option.value !== `1`
        && option.value !== `2`
        && option.value !== `3`) {
        option.disabled = true;
      } else {
        selectedOption = option;
      }
    }
    selectedOption.selected = true;
  } else if (roomsApartment.value === `100`) {
    for (let option of options) {
      if (option.value !== `0`) {
        option.disabled = true;
      } else {
        selectedOption = option;
      }
    }
    selectedOption.selected = true;
  }
};
const onRoomsApartmentChange = () => {
  setRoomsApartment();
};
roomsApartment.addEventListener(`change`, onRoomsApartmentChange);

// При первом запуске один параметр может неверно совпадать с другим в форме
const setDefaultForms = () => {
  setTypeApartment();
  setTimeInApartment();
  setTimeOutApartment();
  setRoomsApartment();
};

setDefaultForms();

// Отправка формы на сервер
adForm.addEventListener(`submit`, (evt) => {
  window.network.save(new FormData(adForm), onSuccess);
  evt.preventDefault();
});

const onSuccess = (answer) => {
  if (answer === true) {
    const templateSuccess = document.querySelector(`#success`).content;
    const mainPage = document.querySelector(`main`);
    const elementSuccess = templateSuccess.cloneNode(true);
    mainPage.appendChild(elementSuccess);
    const successMessage = document.querySelector(`.success`);

    const successMessageClick = () => {
      successMessage.remove();
      adForm.reset();
      window.map.deactivateForms();
      window.pin.removePins(mapPins, mainPin);
      setDefaultForms();
      successMessage.removeEventListener(`click`, successMessageClick);
    };

    const successMessagePressEsc = (evt) => {
      if (evt.key === `Escape`) {
        successMessage.remove();
        document.removeEventListener(`keydown`, successMessagePressEsc);
      }
    };

    successMessage.addEventListener(`click`, successMessageClick);
    document.addEventListener(`keydown`, successMessagePressEsc);
  } else {
    const templateError = document.querySelector(`#error`).content;
    const mainPage = document.querySelector(`main`);
    const elementError = templateError.cloneNode(true);
    mainPage.appendChild(elementError);
    const errorMessage = document.querySelector(`.error`);
    const btnErrorMessage = errorMessage.querySelector(`.error__button`);

    const errorMessageClick = () => {
      errorMessage.remove();
      errorMessage.removeEventListener(`click`, errorMessageClick);
    };

    const errorMessagePressEsc = (evt) => {
      if (evt === `Escape`) {
        errorMessage.remove();
        errorMessage.removeEventListener(`keydown`, errorMessagePressEsc);
      }
    };

    errorMessage.addEventListener(`click`, errorMessageClick);
    errorMessage.addEventListener(`keydown`, errorMessagePressEsc);
    btnErrorMessage.addEventListener(`click`, errorMessageClick);
  }
};

window.form = {
  setTypeApartment,
  onTypeApartmentChange,
  setTimeInApartment,
  setTimeOutApartment,
  onTimeInApartmentChange,
  onTimeOutApartmentChange,
  setRoomsApartment,
  onRoomsApartmentChange
};

})();

/******/ })()
;