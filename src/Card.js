export default class Card {
	constructor(data, openGalleryCallback, templateSelector) {
		this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.openGalleryCallback = openGalleryCallback;
		this.template = document.querySelector(templateSelector);
	}

	/**
	 * Метод для создания DOM-элемента по шаблону
	 * @return {Node}
	 */
	_createCardFromTemplate() {
		const card = this.template.content.cloneNode(true);
		const cardTitle = card.querySelector(".card__title");
		cardTitle.innerText = this.title;
		const cardImage = card.querySelector(".card__image");
		cardImage.setAttribute("src", this.imageUrl);
		cardImage.setAttribute("alt", this.title);

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
		cardLike.addEventListener("click", this._onLikeClick.bind(this));
		deleteIcon.addEventListener("click", this._onDeleteClick.bind(this));
		cardImage.addEventListener("click", this._onImageClick.bind(this));
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
		this.openGalleryCallback(this.title, this.imageUrl);
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