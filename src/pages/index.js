import "./index.css";
import {initialCards, validatorSettings, editButton, addPopupSelector,
	titleProfile, subtitleProfile, cards, addButton, editPopupSelector,
	formEditProfile, formAddCard, popupGallerySelector, cardsSelector} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js" ;
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({titleProfile, subtitleProfile});
const popupAdd = new PopupWithForm(addPopupSelector, function(values) {
	const card = createCard(values.name, values.link);
	cardsSection.addItem(card);
});
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(editPopupSelector, function(values){
	userInfo.setUserInfo(values);
});
popupEdit.setEventListeners();

// 1 попап - Редактирование профиля:
// Открытие попапа редактирования профиля:
editButton.addEventListener("click", () => {
  popupEdit.open();
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
function createCard(name, link) {
	const data = {
		title: name,
		imageUrl: link
	};
	const card = new Card(data, "#card", openGallery);
	return card.buildCard();
};

// Класс Section
const cardsSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardsSection.addItem(cardElement)
  }}, cardsSelector)

	cardsSection.renderItems()

// Валидация форм
const editProfileValidator = new FormValidator (validatorSettings, formEditProfile);
const addCardValidator = new FormValidator (validatorSettings, formAddCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();