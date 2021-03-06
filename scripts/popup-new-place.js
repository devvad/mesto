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

// 1. Повесить на форму внутри попапа событиу submit с обработчиком.

// 2. В обработчике найти инпуты и взять оттуда значение (название места и ссылка на картинку).

// 3. Сформировать объект для колекции initialCards и положить его в НАЧАЛО массива.

// 4. Вызвать функцию renderAllCards.