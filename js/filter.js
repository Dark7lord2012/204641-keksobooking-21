'use strict';

const ALL_OPTIONS = `any`;

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

const Price = {
  LOW_MIDDLE: 10000,
  MIDDLE_HIGH: 50000
};

const PriceRank = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const filterType = (apartments) => {
  if (housingType.value !== ALL_OPTIONS) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.type === housingType.value;
    });
  }

  return apartments;
};

const filterPrice = (apartments) => {
  if (housingPrice.value !== ALL_OPTIONS) {
    if (housingPrice.value === PriceRank.LOW) {
      apartments = apartments.filter((apartment) => {
        return apartment.offer.price < Price.LOW_MIDDLE;
      });
    } else if (housingPrice.value === PriceRank.MIDDLE) {
      apartments = apartments.filter((apartment) => {
        return apartment.offer.price >= Price.LOW_MIDDLE
              && apartment.offer.price < Price.MIDDLE_HIGH;
      });
    } else if (housingPrice.value === PriceRank.HIGH) {
      apartments = apartments.filter((apartment) => {
        return apartment.offer.price >= Price.MIDDLE_HIGH;
      });
    }
  }

  return apartments;
};

const filterRooms = (apartments) => {
  if (housingRooms.value !== ALL_OPTIONS) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.rooms === parseInt(housingRooms.value, 10);
    });
  }

  return apartments;
};

const filterGuests = (apartments) => {
  if (housingGuests.value !== ALL_OPTIONS) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.guests === parseInt(housingGuests.value, 10);
    });
  }

  return apartments;
};

const filterWifi = (apartments) => {
  if (checkboxWifi.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`wifi`);
    });
  }

  return apartments;
};

const filterDishwasher = (apartments) => {
  if (checkboxDishwasher.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`dishwasher`);
    });
  }

  return apartments;
};

const filterParking = (apartments) => {
  if (checkboxParking.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`parking`);
    });
  }

  return apartments;
};

const filterWasher = (apartments) => {
  if (checkboxWasher.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`washer`);
    });
  }

  return apartments;
};

const filterElevator = (apartments) => {
  if (checkboxElevator.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`elevator`);
    });
  }

  return apartments;
};

const filterConditioner = (apartments) => {
  if (checkboxConditioner.checked) {
    apartments = apartments.filter((apartment) => {
      return apartment.offer.features.includes(`conditioner`);
    });
  }

  return apartments;
};

const filterAllOptions = (apartments) => {
  apartments = filterType(apartments);
  apartments = filterPrice(apartments);
  apartments = filterRooms(apartments);
  apartments = filterGuests(apartments);

  apartments = filterWifi(apartments);
  apartments = filterDishwasher(apartments);
  apartments = filterParking(apartments);
  apartments = filterWasher(apartments);
  apartments = filterElevator(apartments);
  apartments = filterConditioner(apartments);

  return apartments;
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

