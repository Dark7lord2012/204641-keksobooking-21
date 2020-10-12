'use strict';

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

let mapPins = document.querySelector(`.map__pins`);
let mapWidth = (document.querySelector(`.map__overlay`).offsetWidth - 20); // 20 - ширина полоски для прокрутки (предполагается)
const MAP_RANGE_TOP = 130;
const MAP_RANGE_BOTTOM = 630;

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

// Генерация случайных квартир
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

// Первое открытие сайта, когда все отключено и деактивированно
// // Форма фильтров на карте
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapFeatures = document.querySelector(`.map__features`);
const pins = document.querySelectorAll(`.map__pin`);
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

// Отрисовка метки
const teplatePin = document.querySelector(`#pin`).content.querySelector(`button`);

const renderPin = (pin) => {
  let pinElement = teplatePin.cloneNode(true);
  let pinImg = pinElement.querySelector(`img`);
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - (pinElement.offsetWidth / 2)}px`;
  pinElement.style.top = `${pin.location.y - pinElement.offsetHeight}px`;

  return pinElement;
};

// Координаты (?) и главная метка
const mainPin = document.querySelector(`.map__pin--main`);
let locationX = parseInt(mainPin.style.left, 10);
let locationY = parseInt(mainPin.style.top, 10);
const addressMainPin = document.querySelector(`#address`);
const widthMainPin = mainPin.offsetWidth;
const heightMainPin = mainPin.offsetHeight;
addressMainPin.value = `${Math.round(locationX + (widthMainPin / 2))}, ${Math.round(locationY + (heightMainPin / 2))}`;

// Активация сайта по клику главной метки
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
  const apartments = generateApartments(8);
  const fragment = document.createDocumentFragment();

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

// Генерация объявления

const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);
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

let card;

const onBtnCloseCardClick = () => {
  map.removeChild(card);
};

const onCardPopupKeydown = (evt) => {
  if (evt.key === `Escape`) {
    map.removeChild(card);
  }
};

const showCardPopup = (pin) => {
  card = renderCard(pin);
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
  card.remove();
  document.removeEventListener(`keydown`, onCardPopupKeydown);
  const btnCloseCard = card.querySelector(`.popup__close`);
  btnCloseCard.removeEventListener(`click`, onBtnCloseCardClick);
};

const mapFilterContainer = document.querySelector(`.map__filters-container`);
const map = document.querySelector(`.map`);

// Валидация объявления
// 1) Тип жилья
const typeApartment = document.querySelector(`#type`);
const priceApartment = document.querySelector(`#price`);

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
setTypeApartment(); // при первом запуске placeholder и тип жилья не совпадает

// 2) Время заезда и уезда
const timeInApartment = document.querySelector(`#timein`);
const timeOutApartment = document.querySelector(`#timeout`);

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
setTimeInApartment();
setTimeOutApartment();

// 3) Количество комнат
const roomsApartment = document.querySelector(`#room_number`);
const capacityApartment = document.querySelector(`#capacity`);
const options = capacityApartment.querySelectorAll(`option`);

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
setRoomsApartment();
