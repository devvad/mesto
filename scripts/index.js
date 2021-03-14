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

	const newCard = {
		name: nameInput.value,
		link: imageInput.value
	};

	initialCards.unshift(newCard);
	renderAllCards();
	newCardForm.reset();
	addPopup.close();
});

// 3 попап - Раскрытие картинки на весь экран:
const popupGallery = makePopup(document.querySelector(".popup_gallery"));

function openGallery(image, figcaption) {
	const galleryImage = document.querySelector(".popup_gallery .popup__image");
	galleryImage.setAttribute("src", image);

	const galleryFigcaption = document.querySelector(
		".popup_gallery .popup__figcaption"
	);
	galleryFigcaption.innerText = figcaption;

	popupGallery.open();
}

// 4 отрисовка списка карточек

function renderCard(card) {
	return `<li class="card">
	<img class="card__image" src="${card.link}" alt="${card.name}">
	<div class="card__info">
		<h2 class="card__title">${card.name}</h2>
		<button type="button" class="card__like"></button>
		<button type="button" class="card__delete-icon"></button>
	</div>
</li>`;
}

function renderAllCards() {
	const cardHtml = initialCards
		.map(function(card) {
			return renderCard(card);
		})
		.join("\n");

	document.querySelector(".cards").innerHTML = cardHtml;

	let likes = document.querySelectorAll(".card__like");

	likes.forEach(function(likeButton) {
		likeButton.addEventListener("click", function() {
			likeButton.classList.toggle("card__like_active");
		});
	});

	let cards = document.querySelectorAll(".card");
	let cardsContainer = document.querySelector(".cards");
	cards.forEach(function(card) {
		card.addEventListener("click", function(event) {
			if (event.target.classList.contains("card__delete-icon")) {
				cardsContainer.removeChild(event.currentTarget);
			}

			if (event.target.classList.contains("card__image")) {
				openGallery(event.target.src, event.target.alt);
			}
		});
	});
}

renderAllCards();
