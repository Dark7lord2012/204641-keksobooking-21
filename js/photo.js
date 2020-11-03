'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChooser = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const imagesChooser = document.querySelector(`#images`);
const imagesPreview = document.querySelector(`.ad-form__photo`);
const photoContainer = document.querySelector(`.ad-form__photo-container`);
const adFormUpload = document.querySelector(`.ad-form__upload`);

avatarChooser.addEventListener(`change`, () => {
  const avatar = avatarChooser.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatar);
  }
});

const onImagesChooserClick = () => {
  const images = imagesChooser.files;
  window.utils.removeChildrenNode(photoContainer, adFormUpload);

  for (let image of images) {
    const imageName = image.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => imageName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

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
        photoContainer.appendChild(block);
      });

      reader.readAsDataURL(image);
    }
  }
};

imagesChooser.addEventListener(`change`, onImagesChooserClick);

window.photo = {
  onImagesChooserClick
};
