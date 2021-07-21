export default class Popup {
	constructor(popupSelector) {
		this._rootElement = document.querySelector(popupSelector);
		this._closeButtonElement = this._rootElement.querySelector(".popup__closed");
	}

	open() {
		this._rootElement.classList.add("popup_opened");
	}

	close() {
		this._rootElement.classList.remove("popup_opened");
	}

	_handleEscClose(event) {
		if (event.key === "Escape") {
    	this.close();
		}
	}

	_handleOverlayClick(event) {
		if (event.target.classList.contains("popup_opened")) {
			this.close();
		}
	}

	_handleCloseButtonClick() {
		this.close();
	}

	setEventListeners() {
		this._rootElement.addEventListener("mousedown", this._handleOverlayClick);
		document.addEventListener("keydown", this._handleEscClose);
		this._closeButtonElement.addEventListener("click", this._handleCloseButtonClick);
	}
}