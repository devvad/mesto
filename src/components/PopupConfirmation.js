import Popup from "./Popup.js";
export default class PopupConfirmation extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._form = this._rootElement.querySelector("form");
		this._handleFormSubmit = handleFormSubmit;
	}

	setCardId(id) {
		this._cardId = id;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			this._handleFormSubmit(this._cardId);
			event.preventDefault();
			this.close();
		});
		return super.setEventListeners();
	}

	open() {
		super.open()
		return new Promise((resolve, reject) => {

		});
	}

	_onClose() {
		
	}
}