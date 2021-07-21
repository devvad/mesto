export default class PopupWithForm extends Popup {
	constructor(handleFormSubmit, popupSelector) {
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._rootElement.querySelector(".popup__form");
		super(popupSelector);
	}

	_getInputValues() {
		const inputs = this._rootElement.querySelectorAll("input[type='text']");
		const result = [];
		for (const input of inputs) {
			result.push(input.value);
		}
		return result;
	}

	setEventListeners() {
		this._form.addEventListener("submit", this._handleFormSubmit);
		super();
	}

	close() {
		this._form.reset();
		super();
	}
}