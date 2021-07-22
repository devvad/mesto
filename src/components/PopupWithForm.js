import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(handleFormSubmit, popupSelector) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._rootElement.querySelector("form");
		this._popupButton = this._rootElement.querySelector(".popup__button");
	}

	_getInputValues() {
		const inputs = this._rootElement.querySelectorAll(".popup__input");
		const result = [];
		for (const input of inputs) {
			result.push(input.value);
		}
		return result;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			this._handleFormSubmit(this._getInputValues());
			event.preventDefault();
			this.close();
		});
		Popup.prototype.setEventListeners.call(this);
	}

	open() {
		this._popupButton.setAttribute("disabled", true);
		this._popupButton.classList.add("popup__button_disabled");
		Popup.prototype.open.call(this);
	}

	close() {
		this._form.reset();
		Popup.prototype.close.call(this);
	}
}