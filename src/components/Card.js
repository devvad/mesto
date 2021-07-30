export default class Card {
	constructor(data, templateSelector, handleCardClick) {
		this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.template = document.querySelector(templateSelector);
		this._likes = data.likes;
		this._myId = data._id;
		this._cardId = data._id;
		this._handleCardClick = handleCardClick;
	}

	/**
	 * Метод для создания DOM-элемента по шаблону
	 * @return {Node}
	 */
	_createCardFromTemplate() {
		const card = this._getTemplate();
		const cardTitle = card.querySelector(".card__title");
		cardTitle.innerText = this.title;
		const cardImage = card.querySelector(".card__image");
		cardImage.setAttribute("src", this.imageUrl);
		cardImage.setAttribute("alt", this.title);

	/*	// Счётчик лайков:
		card.querySelector(".card__likes-container").textContent = this._likes.length;
		// Отображение активных лайков:
		this._likes.forEach(like => {
			if(like._id === this._myId) {
				card.querySelector(".card__like").classList.add("card__like_active")
			}
		}) */

		return card;
	}

	/* setLikesInfo(info) {
		this._element.querySelector(".card__likes-container").textContent = info;
		this._element.querySelector(".card__like").classList.toggle("card__like_active");
	}; */


	_getTemplate() {
		const card = this.template.content.cloneNode(true);
    return card;
  }

	/**
	 * Метод навешивает обработчики событий на переданную карточку.
	 * @param {Node} card
	 * @return {Node}
	 */
	_addEventListenersOnCard(card) {
		const cardLike = card.querySelector(".card__like");
		const deleteIcon = card.querySelector(".card__delete-icon");
		const cardImage = card.querySelector(".card__image");
		cardLike.addEventListener("click", (event) => this._onLikeClick(event));
		deleteIcon.addEventListener("click", (event) => this._onDeleteClick(event));
		cardImage.addEventListener("click", (event) => this._onImageClick(event));
		return card;
	}

	/**
	 * Обработчик клика по лайку.
	 */
	_onLikeClick(event) {
		event.target.classList.toggle("card__like_active");
	}

	/**
	 * Обработчик клика по кнопке удаления.
	 */
	_onDeleteClick(event) {
		event.target.closest('.card').remove();
	}

	/**
	 * Обработчик клика по изображению.
	 */
	_onImageClick() {
		this._handleCardClick(this.title, this.imageUrl);
	}

	/**
	 * Метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
	 */
	buildCard() {
		const card = this._createCardFromTemplate();
		this._addEventListenersOnCard(card);
		return card;
	}
}