'use strict';

// Создал как бы подмодуль для filter, так как оттуда я не могу
// вызвать функцию модуля pin, поэтому создал этот модуль
// который ниже модуля pin и из этого модуля могу спокойно вызвать
// activateForms()

(() => {
  const activateForms = window.pin.activateForms;
  const closeCardPopup = window.card.closeCardPopup;
  const housingType = document.querySelector(`#housing-type`);

  housingType.addEventListener(`change`, () => {
    activateForms();

    // Если карточка пина открыта, то ее нужно закрыть
    const popup = document.querySelector(`.map__card`);
    if (popup) {
      closeCardPopup();
    }
  });
})();
