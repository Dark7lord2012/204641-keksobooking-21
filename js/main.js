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
  `wi-fi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

let mapPins = document.querySelector(`.map__pins`);
let mapWidth = (document.querySelector(`.map__overlay`).offsetWidth - 20); // 20 - ширина полоски для прокрутки (предполагается)
let mapRangeTop = 130;
let mapRangeBottom = 630;

let randomElementArray = (array) => {
  return array[Math.round(Math.random() * (array.length - 1))];
};

// Генерация случайных квартир
let generateApartments = (length) => {
  let apartments = [];

  for (let i = 0; i < length; i++) {
    apartments[i] = {
      author: {
        avatar: `${AVATARS[Math.round(Math.random() * (AVATARS.length - 1))]}`
      },
      offer: {
        title: `Cтрока, заголовок предложения`,
        address: `Площадь Сталина`,
        price: 1000,
        type: randomElementArray(TYPE_APARTMENT),
        rooms: Math.round(Math.random() * 3),
        guests: Math.round(Math.random() * 2),
        checkin: randomElementArray(CHECHKIN),
        checkout: randomElementArray(CHECHKOUT),
        features: randomElementArray(FEATURES),
        description: `Жилье это хорошее, мамой клянусь!`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      },
      location: {
        x: Math.round(Math.random() * mapWidth),
        // Диапазон из ТЗ (130 - 630)
        y: Math.round(Math.random() * (mapRangeBottom - mapRangeTop) + mapRangeTop)
      }
    };
  }
  return apartments;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

let teplatePin = document.querySelector(`#pin`).content.querySelector(`button`);

let renderPin = (pin) => {
  let pinElement = teplatePin.cloneNode(true);
  let pinImg = pinElement.querySelector(`img`);
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  //
  pinElement.style.left = `${pin.location.x - (pinElement.offsetWidth / 2)}px`;
  pinElement.style.top = `${pin.location.y - pinElement.offsetHeight}px`;

  return pinElement;
};

let apartments = generateApartments(40);

let fragment = document.createDocumentFragment();
for (let i = 0; i < apartments.length; i++) {
  fragment.appendChild(renderPin(apartments[i]));
}
mapPins.appendChild(fragment);
