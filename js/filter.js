'use strict';

(() => {
  const housingPrice = document.querySelector(`#housing-price`);
  const housingType = document.querySelector(`#housing-type`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
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

  const filterAllOptions = (apartments) => {
    console.log(apartments);
    let filtered = filterType(apartments);
    filtered = filterPrice(filtered);
    filtered = filterRooms(filtered);
    filtered = filterGuests(filtered);
    console.log(filtered);
    return filtered;
  };

  window.filter = {
    housingType,
    filterType,
    filterPrice,
    filterRooms,
    filterGuests,
    filterAllOptions
  };
})();
