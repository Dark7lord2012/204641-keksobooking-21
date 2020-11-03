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
    [array[i], array[j]] = [array[j], array[i]];
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
