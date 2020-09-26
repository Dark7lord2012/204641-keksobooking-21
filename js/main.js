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
        type: TYPE_APARTMENT[Math.round(Math.random() * (TYPE_APARTMENT.length - 1))],
        rooms: Math.round(Math.random() * 10),
        guests: Math.round(Math.random() * 10),
        checkin: CHECHKIN[Math.round(Math.random() * (CHECHKIN.length - 1))],
        checkout: CHECHKOUT[Math.round(Math.random() * (CHECHKOUT.length - 1))],
        features: FEATURES[Math.round(Math.random() * (FEATURES.length - 1))],
        description: `Жилье это хорошее, мамой клянусь!`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      },
      location: {
        x: 0,
        y: 0
      }
    };
  }

  return apartments;
};

console.table(generateApartments(8));
