let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button__edit');
let closeButton = document.querySelector('.popup__closed');
let titleInput = document.querySelector('#input__popup-title');
let subtitleInput = document.querySelector('#input__popup-subtitle');
let titleProfile = document.querySelector('.profile__title');
let subtitleProfile = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form')

function openPopup() {
  popup.classList.add('popup_opened');
  titleInput.value = titleProfile.textContent;
  subtitleInput.value = subtitleProfile.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleProfile.textContent = titleInput.value;
  subtitleProfile.textContent = subtitleInput.value;
  closePopup();
}
form.addEventListener('submit', formSubmitHandler);