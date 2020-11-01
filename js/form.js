'use strict';

const adForm = document.querySelector(`.ad-form`);
const typeApartment = adForm.querySelector(`#type`);
const priceApartment = adForm.querySelector(`#price`);
const timeInApartment = adForm.querySelector(`#timein`);
const timeOutApartment = adForm.querySelector(`#timeout`);
const roomsApartment = adForm.querySelector(`#room_number`);
const capacityApartment = adForm.querySelector(`#capacity`);
const options = capacityApartment.querySelectorAll(`option`);
const btnReset = adForm.querySelector(`.ad-form__reset`);

const mapPins = document.querySelector(`.map__pins`);
const mainPin = mapPins.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);

const TypeApartment = {
  BUNGALOW: `bungalow`,
  FLAT: `flat`,
  HOUSE: `house`,
  PALACE: `palace`
};

const MinPriceApartment = {
  BUNGALOW: `0`,
  FLAT: `1000`,
  HOUSE: `5000`,
  PALACE: `10000`
};

const setTypeApartment = () => {
  switch (typeApartment.value) {
    case TypeApartment.BUNGALOW:
      priceApartment.min = MinPriceApartment.BUNGALOW;
      priceApartment.placeholder = MinPriceApartment.BUNGALOW;
      break;
    case TypeApartment.FLAT:
      priceApartment.min = MinPriceApartment.FLAT;
      priceApartment.placeholder = MinPriceApartment.FLAT;
      break;
    case TypeApartment.HOUSE:
      priceApartment.min = MinPriceApartment.HOUSE;
      priceApartment.placeholder = MinPriceApartment.HOUSE;
      break;
    case TypeApartment.PALACE:
      priceApartment.min = MinPriceApartment.PALACE;
      priceApartment.placeholder = MinPriceApartment.PALACE;
      break;
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
const setDefaultForms = () => {
  setTypeApartment();
  setTimeInApartment();
  setTimeOutApartment();
  setRoomsApartment();
};

setDefaultForms();

// Отправка формы на сервер
adForm.addEventListener(`submit`, (evt) => {
  window.network.save(new FormData(adForm), onSuccess);
  evt.preventDefault();
});

const onSuccess = (answer) => {
  if (answer === true) {
    const templateSuccess = document.querySelector(`#success`).content;
    const mainPage = document.querySelector(`main`);
    const elementSuccess = templateSuccess.cloneNode(true);
    mainPage.appendChild(elementSuccess);
    const successMessage = document.querySelector(`.success`);

    const successMessageClick = () => {
      successMessage.remove();
      adForm.reset();
      window.map.deactivateForms();
      window.pin.removePins(mapPins, mainPin);
      setDefaultForms();
      successMessage.removeEventListener(`click`, successMessageClick);
    };

    const successMessagePressEsc = (evt) => {
      if (evt.key === `Escape`) {
        successMessage.remove();
        document.removeEventListener(`keydown`, successMessagePressEsc);
      }
    };

    successMessage.addEventListener(`click`, successMessageClick);
    document.addEventListener(`keydown`, successMessagePressEsc);
  } else {
    const templateError = document.querySelector(`#error`).content;
    const mainPage = document.querySelector(`main`);
    const elementError = templateError.cloneNode(true);
    mainPage.appendChild(elementError);
    const errorMessage = document.querySelector(`.error`);
    const btnErrorMessage = errorMessage.querySelector(`.error__button`);

    const errorMessageClick = () => {
      errorMessage.remove();
      errorMessage.removeEventListener(`click`, errorMessageClick);
    };

    const errorMessagePressEsc = (evt) => {
      if (evt === `Escape`) {
        errorMessage.remove();
        errorMessage.removeEventListener(`keydown`, errorMessagePressEsc);
      }
    };

    errorMessage.addEventListener(`click`, errorMessageClick);
    errorMessage.addEventListener(`keydown`, errorMessagePressEsc);
    btnErrorMessage.addEventListener(`click`, errorMessageClick);
  }
};

// Сброс формы по нажатию "Очистить"

const onButtonResetClick = () => {
  window.map.deactivateForms();
  window.data.removeChildrenNode(mapPins, mainPin);
  adForm.reset();
  mapFilters.reset();
  // Из-за того, что я меняю старое содержимое загрузчика изображения на старое (default)
  // удаляется еще и обработчик при выборе картинок после сброса (deactivateForms - последнии строки)
  const imagesChooser = adForm.querySelector(`#images`);
  imagesChooser.addEventListener(`change`, window.photo.onImagesChooserClick);
};

btnReset.addEventListener(`click`, onButtonResetClick);

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
