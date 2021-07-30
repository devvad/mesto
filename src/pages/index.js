import "./index.css";
import Api from "../components/Api.js";
import {validatorSettings, editButton, addPopupSelector,
	titleProfile, subtitleProfile, cards, addButton, editPopupSelector,
	formEditProfile, formAddCard, popupGallerySelector, cardsSelector} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js" ;
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

const api = new Api ({
  url: `https://mesto.nomoreparties.co/v1/cohort-26/`,
  headers: {
    authorization: 'abead934-d5b0-49ba-afc0-24d630c67c1b',
    'Content-Type': 'application/json'
  }
});

// Получение информации о профиле пользователя:
const userInfo = new UserInfo();
api.getUserInfo().then((data) => {
	userInfo.setUserInfo({
		title: data.name,
		subtitle: data.about,
	});
	userInfo.setUserAvatar(data.avatar);
});

const cardsSection = new Section ({
	items: [],
	renderer: (item) => {
		cardsSection.addItem(createCard(item));
	}}, cardsSelector);

// Получение списка карточек с сервера и их рендеринг на страницу:
api.getInitialCards()
.then((data) => {
	cardsSection.setItems(data);
	cardsSection.renderItems();
})

// Добавление новой карточки и её отправка на сервер:
const popupAdd = new PopupWithForm(addPopupSelector, function(values) {
	cardsSection.addItem(createCard(values));
	console.log(values);
	api.addCard({
		name: values.name,
		link: values.link
	})
});
popupAdd.setEventListeners();

// Получение информации о профиле пользователя с сервера:
const popupEdit = new PopupWithForm(editPopupSelector, function(values){
	userInfo.setUserInfo(values);
	api.addProfileInfo({
		name: values.title,
		about: values.subtitle
	})
});
popupEdit.setEventListeners();

// 1 попап - Редактирование профиля:
// Открытие попапа редактирования профиля:
editButton.addEventListener("click", () => {
  popupEdit.open();
	popupEdit.setInputValues(userInfo.getUserInfo());
	editProfileValidator.enableValidation();
})

// 2 попап - Добавление нового места:
addButton.addEventListener("click", function() {
	popupAdd.open();
});

// 3 попап - Раскрытие картинки на весь экран:
function openGallery(name, link) {
	const popupWithGallery = new PopupWithImage({src: link, alt: name}, popupGallerySelector);
	popupWithGallery.setEventListeners();
	popupWithGallery.open();
};

// 4 отрисовка списка карточек
function createCard({name, link}) {
	const data = {
		title: name,
		imageUrl: link
	};
	const card = new Card(data, "#card", openGallery);
	return card.buildCard();
};

// Класс Section


// Валидация форм
const editProfileValidator = new FormValidator (validatorSettings, formEditProfile);
const addCardValidator = new FormValidator (validatorSettings, formAddCard);
addCardValidator.enableValidation();