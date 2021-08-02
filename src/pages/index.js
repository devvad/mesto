import "./index.css";
import Api from "../components/Api.js";
import {validatorSettings, editButton, addPopupSelector, popupConfirmSelector, editAvatarButtonSelector,
	formNewAvatar, addButton, editPopupSelector, profileAvatarSelector, titleProfileSelector, subtitleProfileSelector, popupEditAvatarSelector,
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

// Получение информации о профиле пользователя  и получение списка карточек с сервера и их рендеринг на страницу:
const userInfo = new UserInfo(titleProfileSelector, subtitleProfileSelector, editAvatarButtonSelector);
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
	userInfo.setUserInfo(userData);
	userInfo.setUserId(userData._id);
	userInfo.setUserAvatar(userData.avatar);
	cardsSection.setItems(cardsData);
	cardsSection.renderItems();
})
.catch((err) => {
  console.log(err);
});

const cardsSection = new Section ({
	items: [],
	renderer: (item) => {
		const card = createCard(item)
		cardsSection.addItem(card);
	}}, cardsSelector);

// Добавление новой карточки и её отправка на сервер:
const popupAdd = new PopupWithForm(addPopupSelector, function(values) {
	return api.addCard({
		name: values.name,
		link: values.link
	})
	.then( (data) => {
		const card = createCard(data)
		cardsSection.addItem(card);
		popupAdd.close();
	})
	.catch((err) => {
		console.log(err);
	});
});
popupAdd.setEventListeners();

// Получение информации о профиле пользователя с сервера:
const popupEdit = new PopupWithForm(editPopupSelector, function(data) {
	return api.addProfileInfo(data)
	.then(() => {
		userInfo.setUserInfo(data);
		popupEdit.close();
	})
	.catch((err) => {
    console.log(err);
  });
});
popupEdit.setEventListeners();

// Изменение аватара пользователя:
const popupNewAvatar = new PopupWithForm(profileAvatarSelector, values => {
	return api.newAvatar(values)
  .then(() => {
    userInfo.setUserAvatar(values.avatar);
    popupNewAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
popupNewAvatar.setEventListeners();

// Открытие попапа обновления аватара пользлвателя:
document.querySelector(editAvatarButtonSelector).addEventListener("click", () => {
  popupNewAvatar.open();
})

// 1 попап - Редактирование профиля:
// Открытие попапа редактирования профиля:
editButton.addEventListener("click", () => {
  popupEdit.open();
	popupEdit.setInputValues(userInfo.getUserInfo());
})

// 2 попап - Добавление нового места:
addButton.addEventListener("click", function() {
	popupAdd.open();
});

// 3 попап - Раскрытие картинки на весь экран:
const popupWithGallery = new PopupWithImage(popupGallerySelector);
popupWithGallery.setEventListeners();

function openGallery(name, link) {
	popupWithGallery.open({src: link, alt: name});
};

// 4 отрисовка списка карточек
const popupConfirmDelete = new PopupConfirmation(popupConfirmSelector);
popupConfirmDelete.setEventListeners();

function createCard({name, link, likes, _id, owner}) {
	const data = {
		title: name,
		imageUrl: link,
		likes: likes,
		myId: userInfo.getUserId(),
		id: _id,
		owner: owner
	};
	const card = new Card(data, "#card", openGallery, handleLikeClick, handleDeleteClick);
	const cardElement = card.buildCard();
	function handleLikeClick(id, isLiked) {
		if (isLiked) {
			api.removeLike(id)
			.then((data) => {
				card.setLikesCounter(data.likes.length);
				card.updateLikes(data.likes);
			});
		} else {
			api.putLike(id)
			.then((data) => {
				card.setLikesCounter(data.likes.length);
				card.updateLikes(data.likes);
			});
		}
	}
	function handleDeleteClick() {
		popupConfirmDelete.setHandleFormSubmit(() => {
			api.removeCard(_id)
			.then(() => {
				cardElement.remove();
				popupConfirmDelete.close()
			});
		});
		popupConfirmDelete.open();
	}
	return cardElement;
};

// Валидация форм:
const editProfileValidator = new FormValidator (validatorSettings, formEditProfile);
const addCardValidator = new FormValidator (validatorSettings, formAddCard);
const newAvatarValidator = new FormValidator (validatorSettings, formNewAvatar);
addCardValidator.enableValidation();
newAvatarValidator.enableValidation();
editProfileValidator.enableValidation();
