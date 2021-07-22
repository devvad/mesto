import "./index.css";
import {initialCards, validatorSettings, editPopup, editButton, closeButton, titleInput, subtitleInput,
	titleProfile, subtitleProfile, editProfileForm, cards, addPopup, addButton, newCardForm, nameInput,
	imageInput, popupGallery, galleryImage, galleryFigcaption, formEditProfile, formAddCard} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js" ;
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({titleProfile, subtitleProfile});

const popupGalleryOpen = new PopupWithImage(popupGallery);
const popupAdd = new PopupWithForm(addPopup, newCardForm);
const popupEdit = new PopupWithForm(editPopup, submitEditProfileForm);

// 1 попап - Редактирование профиля:
// Открытие попапа редактирования профиля:
editButton.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  titleInput.value = userInformation.title;
  subtitleInput.value = userInformation.subtitle;
  popupEdit.open();
})

popupGalleryOpen.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();

// Функция редактирования профиля:
function submitEditProfileForm (data) {
	data.preventDefault();
  userInfo.setUserInfo(data);
  popupEdit.close();
}
editProfileForm.addEventListener("submit", submitEditProfileForm);

// 2 попап - Добавление нового места:
addButton.addEventListener("click", function() {
	popupAdd.open();
});

newCardForm.addEventListener("submit", function(event) {
	const popupButton = event.target.querySelector(".popup__button")
	event.preventDefault();

	const card = createCard(nameInput.value, imageInput.value);
	cards.prepend(card);
	newCardForm.reset();
	addPopup.close();
	popupButton.setAttribute("disabled", true);
	popupButton.classList.add("popup__button_disabled");
});

// 3 попап - Раскрытие картинки на весь экран:
function openGallery(name, link) {
	galleryImage.setAttribute("src", link);
	galleryImage.setAttribute("alt", name);
	galleryFigcaption.innerText = name;
	popupGalleryOpen.open();
};

// 4 отрисовка списка карточек
function createCard(name, link) {
	const data = {
		title: name,
		imageUrl: link
	};
	const card = new Card(data, openGallery, "#card");
	return card.buildCard();
};

initialCards.forEach((data) => {
	const card = createCard(data.name, data.link);
	cards.append(card);
});

// Класс Section
const renderCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    renderCards.addItem(cardElement)
  }},
  containerSelector)

renderCards.renderItems()

// Валидация форм
const editProfileValidator = new FormValidator (validatorSettings, formEditProfile);
const addCardValidator = new FormValidator (validatorSettings, formAddCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();