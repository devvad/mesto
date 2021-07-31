export default class Card {
	constructor(data, templateSelector, handleCardClick, handleLikeClick) {
		this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.template = document.querySelector(templateSelector);
		this._likes = data.likes || [];
		this._myId = data.myId;
		this._cardId = data.id;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
	}

	_setLikesCounter(card, count) {
		card.querySelector(".card__likes-container").textContent = count;
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
		return card;
	}

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
		this._handleLikeClick(this._cardId, this._isLiked());
	}

	_isLiked() {
		return this._likes.some(user => {
			return user._id === this._myId;
		});
	}

	_setLikeIfActive(card) {
			// Отображение активных лайков:
			const isLiked = this._isLiked();

			if (isLiked) {
				card.querySelector(".card__like").classList.add("card__like_active");
			}
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
	 * Метод, который возвращает полностью работоспособный и наполненный данными элемент карточки:
	 */
	buildCard() {
		const card = this._createCardFromTemplate();
		this._addEventListenersOnCard(card);
		this._setLikesCounter(card, this._likes.length);
		this._setLikeIfActive(card);
		return card;
	}
}