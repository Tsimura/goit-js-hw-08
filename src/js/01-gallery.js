// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryImagesEl = document.querySelector('div.gallery');
const galleryMarkup = createImgGallery(galleryItems);
let imageSource = '';
let createModalWindow;

galleryImagesEl.insertAdjacentHTML('beforeend', galleryMarkup);
galleryImagesEl.addEventListener('click', onGalleryCatchClick);

function createImgGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}" >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}" 
        alt="${description}"
      />
    </a>
  </div>
  `;
    })
    .join('');
}

function onGalleryCatchClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  imageSource = e.target.dataset.source;

  galleryImagesEl.onclick = () => {
    createModalWindow = basicLightbox.create(
      `
		<img width="1400" height="900"
    src="${imageSource}">
	`,
    );
    createModalWindow.show();

    window.addEventListener('keydown', onEscKeyPress);
  };
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    createModalWindow.close();
    closeModal();
  }
}
console.log(galleryItems);
