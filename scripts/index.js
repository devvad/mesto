// 0 общие функции для попапов
function makePopup(rootElement) {
  const popup = {
    open() {
      rootElement.classList.add("popup_opened");
    },
    close() {
      rootElement.classList.remove("popup_opened");
    }
  };
  const closeButtonElement = rootElement.querySelector(".popup__closed");
  closeButtonElement.addEventListener("click", function() {
    popup.close();
  });
  return popup;
}

// 1 попап - Редактирование профиля:
const editPopup = makePopup(document.querySelector(".popup"));
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__closed");
const titleInput = document.querySelector("#input-popup-title");
const subtitleInput = document.querySelector("#input-popup-subtitle");
const titleProfile = document.querySelector(".profile__title");
const subtitleProfile = document.querySelector(".profile__subtitle");
const editProfileForm = document.querySelector(".popup__form");
const cards = document.querySelector(".cards");

editButton.addEventListener("click", function() {
	editPopup.open();
	titleInput.value = titleProfile.textContent;
	subtitleInput.value = subtitleProfile.textContent;
});

function submitEditProfileForm(evt) {
	evt.preventDefault();
	titleProfile.textContent = titleInput.value;
	subtitleProfile.textContent = subtitleInput.value;
	editPopup.close();
}
editProfileForm.addEventListener("submit", submitEditProfileForm);

// 2 попап - Добавление нового места:
const addPopup = makePopup(document.querySelector(".popup_type_place"));
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function() {
	addPopup.open();
});

const newCardForm = document.querySelector(".popup__form-add-card");
const nameInput = document.querySelector(".popup__input_type_name");
const imageInput = document.querySelector(".popup__input_type_link-url");

newCardForm.addEventListener("submit", function(event) {
	event.preventDefault();

	const card = createCard(nameInput.value, imageInput.value);
	cards.prepend(card);

	newCardForm.reset();
	addPopup.close();
});

// 3 попап - Раскрытие картинки на весь экран:
const popupGallery = makePopup(document.querySelector(".popup_gallery"));
const galleryImage = document.querySelector(".popup__image");
const galleryFigcaption = document.querySelector(".popup__figcaption");

function openGallery(name, link) {
	galleryImage.setAttribute("src", link);
	galleryImage.setAttribute("alt", name);
	galleryFigcaption.innerText = name;
	popupGallery.open();
};

// 4 отрисовка списка карточек
function createCard(name, link) {
	const card = document.getElementById("card").content.cloneNode(true);

	const cardLike = card.querySelector(".card__like");
	const deleteIcon = card.querySelector(".card__delete-icon");
	const cardImage = card.querySelector(".card__image");
	const cardTitle = card.querySelector(".card__title");

	cardImage.setAttribute("src", link);
	cardImage.setAttribute("alt", name)
	cardTitle.innerText = name;

	cardLike.addEventListener("click", function() {
		cardLike.classList.toggle("card__like_active");
	});

	deleteIcon.addEventListener("click", function(event) {
		event.target.closest('.card').remove();
	});

	cardImage.addEventListener("click", function() {
		openGallery(name, link);
	});

	return card;
}

initialCards.forEach((data) => {
	const card = createCard(data.name, data.link);
	cards.append(card);
});
