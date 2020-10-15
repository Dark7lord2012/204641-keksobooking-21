'use strict';

(() => {
  const typeApartment = document.querySelector(`#type`);
  const priceApartment = document.querySelector(`#price`);
  const timeInApartment = document.querySelector(`#timein`);
  const timeOutApartment = document.querySelector(`#timeout`);
  const roomsApartment = document.querySelector(`#room_number`);
  const capacityApartment = document.querySelector(`#capacity`);
  const options = capacityApartment.querySelectorAll(`option`);

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

  // 2) Время заезда и уезда

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

  // 3) Количество комнат

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

  // При первом запуске один параметр может неверно совпадать с другим в форме
  setTypeApartment();
  setTimeInApartment();
  setTimeOutApartment();
  setRoomsApartment();

  window.form = {
    setTypeApartment,
    onTypeApartmentChange,
    setTimeInApartment,
    setTimeOutApartment,
    onTimeInApartmentChange,
    onTimeOutApartmentChange,
    setRoomsApartment,
    onRoomsApartmentChange
  };
})();

