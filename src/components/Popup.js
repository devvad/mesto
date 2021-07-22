import {closeButtonSelector} from "../utils/constants.js";
const popupOpenClass = "popup_opened";
export default class Popup {
	constructor(popupSelector) {
		this._rootElement = document.querySelector(popupSelector);
		this._closeButtonElement = this._rootElement.querySelector(closeButtonSelector);
	}

	open() {
		this._rootElement.classList.add(popupOpenClass);
	}

	close() {
		this._rootElement.classList.remove(popupOpenClass);
	}

	_handleEscClose(event) {
		if (event.key === "Escape") {
    	this.close();
		}
	}

	_handleOverlayClick(event) {
		if (event.target.classList.contains(popupOpenClass)) {
			this.close();
		}
	}

	_handleCloseButtonClick() {
		this.close();
	}

	setEventListeners() {
		this._rootElement.addEventListener("mousedown", (event) => this._handleOverlayClick(event));
		document.addEventListener("keydown", (event) => this._handleEscClose(event));
		this._closeButtonElement.addEventListener("click", (event) => this._handleCloseButtonClick(event));
	}
}