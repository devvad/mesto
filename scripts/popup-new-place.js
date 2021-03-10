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


// 1. Повесить на форму внутри попапа событие submit с обработчиком.

// 2. В обработчике найти инпуты и взять оттуда значение (название места и ссылка на картинку).

// 3. Сформировать объект для колекции initialCards и положить его в НАЧАЛО массива.

// 4. Вызвать функцию renderAllCards.