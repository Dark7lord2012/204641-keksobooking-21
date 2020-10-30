'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChooser = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const imagesChooser = document.querySelector(`#images`);
const imagesPreview = document.querySelector(`.ad-form__photo`);
const photoContainer = document.querySelector(`.ad-form__photo-container`);
const adFormUpload = document.querySelector(`.ad-form__upload`);

avatarChooser.addEventListener(`change`, () => {
  let avatar = avatarChooser.files[0];
  let avatarName = avatar.name.toLowerCase();

  let matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatar);
  }
});

imagesChooser.addEventListener(`change`, () => {
  let images = imagesChooser.files;
  window.data.removeChildrenNode(photoContainer, adFormUpload);
  // let fragment = document.createDocumentFragment();

  for (let image of images) {
    let imageName = image.name.toLowerCase();

    let matches = FILE_TYPES.some((it) => imageName.endsWith(it));

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const element = document.createElement(`img`);
        const block = imagesPreview.cloneNode(true);

        element.src = reader.result;
        element.style.maxWidth = `100%`;
        element.style.height = `auto`;
        element.style.maxHeight = `100%`;
        element.style.display = `block`;
        element.style.margin = `auto`;

        block.style.display = `flex`;

        block.appendChild(element);
        photoContainer.appendChild(block); // Пытался изменить эту строку на fragment но не стработало
        // fragment.appendChild(block);
      });

      reader.readAsDataURL(image);
    }
  }

  // console.log(`hi`);
  // photoContainer.appendChild(fragment);
});
