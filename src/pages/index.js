import "./index.css";
import Api from "../components/Api.js";
import {validatorSettings, editButton, addPopupSelector, popupConfirmSelector, popupEditAvatar,
	formNewAvatar, addButton, editPopupSelector, profileAvatarSelector,
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
api.getUserInfo()
.then((data) => {
	userInfo.setUserInfo({
		title: data.name,
		subtitle: data.about
	});
	userInfo.setUserId(data._id);
	userInfo.setUserAvatar(data.avatar);
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

// Получение списка карточек с сервера и их рендеринг на страницу:
api.getInitialCards()
.then((data) => {
	cardsSection.setItems(data);
	cardsSection.renderItems();
})
.catch((err) => {
	console.log(err);
});

// Добавление новой карточки и её отправка на сервер:
const popupAdd = new PopupWithForm(addPopupSelector, function(values) {
	return api.addCard({
		name: values.name,
		link: values.link
	})
	.then( (data) => {
		const card = createCard(data)
		cardsSection.addItem(card);
	})
	.catch((err) => {
		console.log(err);
	});
});
popupAdd.setEventListeners();

// Получение информации о профиле пользователя с сервера:
const popupEdit = new PopupWithForm(editPopupSelector, function(values) {
	userInfo.setUserInfo(values);
	return api.addProfileInfo({
		name: values.title,
		about: values.subtitle
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
popupEditAvatar.addEventListener("click", () => {
  popupNewAvatar.open();
})

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
				card.setLikesCounter(cardElement, data.likes.length);
				card.updateLikes(data.likes);
			});
		} else {
			api.putLike(id)
			.then((data) => {
				card.setLikesCounter(cardElement, data.likes.length);
				card.updateLikes(data.likes);
			});
		}
	}
	function handleDeleteClick() {
		popupConfirmDelete.setHandleFormSubmit(() => {
			api.removeCard(_id)
			.then(() => {
				cardElement.remove();
			})
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
