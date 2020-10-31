'use strict';

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
  popupTime.textContent = `Заезд после ${card.offer.checkin} выезд до ${card.offer.checkout}`;

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
