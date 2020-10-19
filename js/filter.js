'use strict';

(() => {
  const housingType = document.querySelector(`#housing-type`);
  const housingAllTypes = `any`;

  const filterType = (apartments) => {
    let filtered = apartments;

    if (housingType.value !== housingAllTypes) {
      filtered = filtered.filter((apartment) => {
        return apartment.offer.type === housingType.value;
      });

      const result = filtered.slice(0, 5);
      return result;
    }

    const result = filtered.slice(0, 5);
    return result;
  };

  window.filter = {
    housingType,
    filterType
  };
})();
