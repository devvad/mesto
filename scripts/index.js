// 1 попап - Редактирование профиля:
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__closed");
const titleInput = document.querySelector("#input-popup-title");
const subtitleInput = document.querySelector("#input-popup-subtitle");
const titleProfile = document.querySelector(".profile__title");
const subtitleProfile = document.querySelector(".profile__subtitle");
const form = document.querySelector(".popup__form");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  titleInput.value = titleProfile.textContent;
  subtitleInput.value = subtitleProfile.textContent;
}
editButton.addEventListener("click", openPopup);

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleProfile.textContent = titleInput.value;
  subtitleProfile.textContent = subtitleInput.value;
  closePopup();
}
form.addEventListener("submit", formSubmitHandler);

// 2 попап - Добавление нового места:
function onPlusClick() {
  const popup = document.querySelector(".popup_type_place");
  popup.classList.add("popup_opened");
}

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", onPlusClick);

function onCloseClick() {
  const popup = document.querySelector(".popup_type_place");
  popup.classList.remove("popup_opened");
}

const popupClosedButton = document.querySelector(
  ".popup_type_place .popup__closed"
);
popupClosedButton.addEventListener("click", onCloseClick);

function onNewCardFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(
    ".popup_type_place .popup__input_type_name"
  );
  const imageInput = document.querySelector(
    ".popup_type_place .popup__input_type_link-url"
  );

  const newCard = {
    name: nameInput.value,
    link: imageInput.value
  };

  initialCards.unshift(newCard);
  renderAllCards();
  onCloseClick();
}

const newCardForm = document.querySelector(".popup_type_place .popup__form");
newCardForm.addEventListener("submit", onNewCardFormSubmit);

// 3 попап - Раскрытие картинки на весь экран:
const popupGallery = document.querySelector(".popup_gallery");

function openGallery(image, figcaption) {
  const galleryImage = document.querySelector(".popup_gallery .popup__image");
  galleryImage.setAttribute("src", image);

  const galleryFigcaption = document.querySelector(
    ".popup_gallery .popup__figcaption"
  );
  galleryFigcaption.innerText = figcaption;

  popupGallery.classList.add("popup_opened");
}

const popupGalleryCloseButton = document.querySelector(
  ".popup_gallery .popup__closed"
);
popupGalleryCloseButton.addEventListener("click", function onGalleryClose() {
  popupGallery.classList.remove("popup_opened");
});
