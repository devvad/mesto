function onPlusClick() {
	let popup = document.querySelector('.popup_type_place');
	popup.classList.add('popup_opened');
}

let addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', onPlusClick);

function onCloseClick() {
	let popup = document.querySelector('.popup_type_place');
	popup.classList.remove('popup_opened');
}

let popupClosedButton = document.querySelector('.popup_type_place .popup__closed');
popupClosedButton.addEventListener('click', onCloseClick);

function onNewCardFormSubmit(evt) {
	evt.preventDefault();
	let nameInput = document.querySelector('.popup_type_place .popup__input_type_name');
	let imageInput = document.querySelector('.popup_type_place .popup__input_type_link-url');

	let newCard = {
		name: nameInput.value,
		link: imageInput.value
	};

	initialCards.unshift(newCard);
	renderAllCards();
	onCloseClick();
}

let newCardForm = document.querySelector('.popup_type_place .popup__form');
newCardForm.addEventListener('submit', onNewCardFormSubmit);