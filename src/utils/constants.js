export const initialCards = [{
  name: 'Батайск',
  link: 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxRS8l9iCIS9vT63qINr_7rSQ.jpg'
},
{
  name: 'Ростов-на-Дону',
  link: 'https://s00.yaplakal.com/pics/pics_preview/7/7/8/7128877.jpg'
},
{
  name: 'Таганрог',
  link: 'https://foma.ru/wp-content/uploads/2017/03/Kamennaya_lestnitsa_AlixSaz_viki-768x1152.jpg'
},
{
  name: 'Новосибирск',
  link: 'https://i1.photo.2gis.com/images/geo/0/30258560047953793_8d48.jpg'
},
{
  name: 'Таганрог',
  link: 'https://a.d-cd.net/6337402s-960.jpg'
},
{
  name: 'Эдинбург',
  link: 'https://pbs.twimg.com/media/BbUg1RKIgAAUh7d.jpg:large'
},
];

export const validatorSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active"
};

export const editPopupSelector = ".profile-popup";
export const profileAvatar = document.querySelector(".profile__avatar");
export const editPopup = document.querySelector(editPopupSelector);
export const editButton = document.querySelector(".profile__edit-button");
export const closeButtonSelector = ".popup__closed";
export const closeButton = document.querySelector(closeButtonSelector);
export const titleInput = document.querySelector("#input-popup-title");
export const subtitleInput = document.querySelector("#input-popup-subtitle");
export const titleProfile = document.querySelector(".profile__title");
export const subtitleProfile = document.querySelector(".profile__subtitle");
export const popupFormSelector = ".popup__form";
export const editProfileForm = document.querySelector(popupFormSelector);
export const cardsSelector = ".cards";
export const cards = document.querySelector(cardsSelector);
export const addPopupSelector = ".popup-type-place"
export const addPopup = document.querySelector(addPopupSelector);
export const addButton = document.querySelector(".profile__add-button");
export const newCardForm = document.querySelector(".popup__form-add-card");
export const nameInput = document.querySelector(".popup__input_type_name");
export const imageInput = document.querySelector(".popup__input_type_link-url");
export const popupGallerySelector = ".popup_gallery";
export const popupGallery = document.querySelector(popupGallerySelector);
export const galleryImage = document.querySelector(".popup__image");
export const galleryFigcaption = document.querySelector(".popup__figcaption");
export const formEditProfile = document.querySelector(".popup__form");
export const formAddCard = document.querySelector(".popup__form-add-card");