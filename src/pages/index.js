import "./index.css";
import {initialCards, validatorSettings, editPopup, editButton, titleInput, subtitleInput,
	titleProfile, subtitleProfile, editProfileForm, cards, addPopup, addButton, newCardForm, nameInput,
	imageInput, formEditProfile, formAddCard, popupGallerySelector} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js" ;
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({titleProfile, subtitleProfile});
const popupAdd = new PopupWithForm(function(values) {
	const card = createCard(values[0], values[1]);
	cards.prepend(card);
}, ".popup-type-place");
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(function(values){
	userInfo.setUserInfo({title: values[0], subtitle: values[1]})
}, ".profile-popup");
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
const renderCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    renderCards.addItem(cardElement)
  }},
  ".cards")

renderCards.renderItems()

// Валидация форм
const editProfileValidator = new FormValidator (validatorSettings, formEditProfile);
const addCardValidator = new FormValidator (validatorSettings, formAddCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();