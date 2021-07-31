export default class FormValidator {
	constructor(data, formElement) {
		this.data = data;
		this.formElement = formElement;
		this.inputList = Array.from(this.formElement.querySelectorAll(this.data.inputSelector));
		this.buttonElement = this.formElement.querySelector(this.data.submitButtonSelector);
		this._inited = false;
	}

	/**
 	* Навешивает все обработчики события на форму.
 	*/
	_addEventListeners() {
		this.formElement.addEventListener("reset", () => {
			this._disableSubmitButton();
		});
		this.inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
		this._toggleButtonState();
	}

	/**
	 * Проверяет конкретный инпут на валидность.
	 * @param {Node} inputElement
	 */
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	/**
	 * Показывает переданную ошибку на инпуте.
	 * @param {Node} inputElement
	 * @param {String} errorMessage
	 */
	_showInputError(inputElement, errorMessage) {
		const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this.data.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this.data.errorClass);
	}

	/**
	 * Скрывает текст ошибки.
	 * @param {Node} inputElement
	 */
	_hideInputError(inputElement) {
		const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
  	inputElement.classList.remove(this.data.inputErrorClass);
  	errorElement.classList.remove(this.data.errorClass);
  	errorElement.textContent = '';
	}

	/**
	 * Переключаем задизейбленное состояние кнопки.
	 * @param {Node[]} inputList
	 * @param {Node} buttonElement
	 */
	_toggleButtonState() {
		if (this._hasInvalidInput ()) {
			this._disableSubmitButton();
		} else {
			this.buttonElement.classList.remove(this.data.inactiveButtonClass);
			this.buttonElement.removeAttribute("disabled");
		}
	}

	_disableSubmitButton() {
		this.buttonElement.classList.add(this.data.inactiveButtonClass);
		this.buttonElement.setAttribute("disabled", "disabled");
	}

	/**
	 * Проверяет, есть ли хотя бы один невалидный инпут.
	 * @param {Node[]} inputList
	 */
	_hasInvalidInput() {
		return this.inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	/**
	 * Метод, который включает валидацию формы.
	 */
	enableValidation() {
		if (this._inited) {
			return;
		}
		this._inited = true;
		this._addEventListeners()
	}
}