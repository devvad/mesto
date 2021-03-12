let popupGallery = document.querySelector('.popup_gallery');

function openGallery(image, figcaption) {
	let galleryImage = document.querySelector('.popup_gallery .popup__image');
	galleryImage.setAttribute('src', image);

	let galleryFigcaption = document.querySelector('.popup_gallery .popup__figcaption');
	galleryFigcaption.innerText = figcaption;

	popupGallery.classList.add('popup_opened');
}

let popupGalleryCloseButton = document.querySelector('.popup_gallery .popup__closed');
popupGalleryCloseButton.addEventListener('click', function onGalleryClose() {
	popupGallery.classList.remove('popup_opened');
});
