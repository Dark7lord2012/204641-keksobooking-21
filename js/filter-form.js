'use strict';

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

