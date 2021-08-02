import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._rootElement.querySelector("form");
		this._popupButton = this._rootElement.querySelector(".popup__button");
		this._inputs = this._rootElement.querySelectorAll(".popup__input");
	}

	setInputValues(formValues) {
		this._inputs.forEach(input => input.value = formValues[input.name]);
	}

	_getInputValues() {
		const formValues = {};
		this._inputs.forEach(input => formValues[input.name] = input.value);
		 return formValues;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			const oldValue = this._popupButton.textContent;
			this._popupButton.textContent = "Сохранение...";
			this._handleFormSubmit(this._getInputValues())
			.finally(() => {
				this._popupButton.textContent = oldValue;
			})
			event.preventDefault();
		});
		return super.setEventListeners();
	}

	close() {
		this._form.reset();
		return super.close();
	}
}