'use strict';

(() => {
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
