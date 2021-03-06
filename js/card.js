'use strict';

const PRICE_PER_NIGHT = `₽/ночь`;
const ESCAPE_ACTION_KEY = `Escape`;

const TypeApartmentRussian = {
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  BUNGALOW: `Бунгало`
};


const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);
const removeChildrenNode = window.utils.removeChildrenNode;
const mapFilterContainer = document.querySelector(`.map__filters-container`);
const map = document.querySelector(`.map`);

const renderCard = (card) => {
  const cardElement = templateCard.cloneNode(true);

  const popupTitle = cardElement.querySelector(`.popup__title`);
  if (card.offer.title) {
    popupTitle.textContent = card.offer.title;
  } else {
    popupTitle.remove();
  }

  const popupAddress = cardElement.querySelector(`.popup__text--address`);
  if (card.offer.address) {
    popupAddress.textContent = card.offer.address;
  } else {
    popupAddress.remove();
  }

  const popupPrice = cardElement.querySelector(`.popup__text--price`);
  if (card.offer.price) {
    popupPrice.textContent = `${card.offer.price}${PRICE_PER_NIGHT}`;
  } else {
    popupPrice.remove();
  }

  const popupType = cardElement.querySelector(`.popup__type`);
  if (card.offer.type) {
    popupType.textContent = TypeApartmentRussian[card.offer.type.toUpperCase()];
  } else {
    popupType.remove();
  }

  const popupCapacity = cardElement.querySelector(`.popup__text--capacity`);
  if (card.offer.rooms && card.offer.guests) {
    popupCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = cardElement.querySelector(`.popup__text--time`);
  if (card.offer.checkin && card.offer.checkout) {
    popupTime.textContent = `Заезд после ${card.offer.checkin} выезд до ${card.offer.checkout}`;
  } else {
    popupTime.remove();
  }

  // Фичи
  const popupFeatures = cardElement.querySelector(`.popup__features`);
  const feature = cardElement.querySelector(`.popup__feature`);

  if (card.offer.features && card.offer.features.length > 0) {
    removeChildrenNode(popupFeatures);

    for (let i = 0; i < card.offer.features.length; i++) {
      const featureElement = feature.cloneNode(true);
      featureElement.className = `popup__feature popup__feature--${card.offer.features[i]}`;
      popupFeatures.appendChild(featureElement);
    }
  } else {
    popupFeatures.remove();
  }

  const popupDescription = cardElement.querySelector(`.popup__description`);
  if (card.offer.description) {
    popupDescription.textContent = card.offer.description;
  } else {
    popupDescription.remove();
  }

  // Фото
  const popupPhotosContainer = cardElement.querySelector(`.popup__photos`);
  const popupPhoto = cardElement.querySelector(`.popup__photo`);

  if (card.offer.photos && card.offer.photos.length > 0) {
    removeChildrenNode(popupPhotosContainer);

    for (let i = 0; i < card.offer.photos.length; i++) {
      const photoElement = popupPhoto.cloneNode(true);
      photoElement.src = `${card.offer.photos[i]}`;
      popupPhotosContainer.appendChild(photoElement);
    }

  } else {
    popupPhotosContainer.remove();
  }

  const popupAvatar = cardElement.querySelector(`.popup__avatar`);
  if (card.author.avatar) {
    popupAvatar.src = card.author.avatar;
  } else {
    popupAvatar.remove();
  }

  return cardElement;
};

const onBtnCloseCardClick = () => {
  closeCardPopup();
};

const onCardPopupKeydown = (evt) => {
  if (evt.key === ESCAPE_ACTION_KEY) {
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
