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

      filtered = filtered.concat(apartments);
      const result = filtered.filter((apartment, index) => {
        return filtered.indexOf(apartment) === index;
      });
      return result;
    }

    filtered = filtered.concat(apartments);
    const result = filtered.filter((apartment, index) => {
      return filtered.indexOf(apartment) === index;
    });
    return result;
  };

  window.filter = {
    housingType,
    filterType
  };
})();
