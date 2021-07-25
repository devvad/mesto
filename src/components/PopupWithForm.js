import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(handleFormSubmit, onPopupOpen, onPopupClose, popupSelector) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._rootElement.querySelector("form");
		this._popupButton = this._rootElement.querySelector(".popup__button");
		this._onPopupOpen = onPopupOpen;
		this._onPopupClose = onPopupClose;
	}

	_getInputValues() {
		const inputs = this._rootElement.querySelectorAll(".popup__input");
		const formValues = {};
 		inputs.forEach(input => formValues[input.name] = input.value);
		 return formValues;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			this._handleFormSubmit(this._getInputValues());
			event.preventDefault();
			this.close();
		});
		return super.setEventListeners();
	}

	open() {
		this._onPopupOpen(this._form);
		return super.open();
	}

	close() {
		this._onPopupClose();
		this._form.reset();
		return super.close();
	}
}