export default class FormValidator {
	constructor(data, formElement) {
		this._data = data;
		this._formElement = formElement;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
		this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
	}

	/**
 	* Навешивает все обработчики события на форму.
 	*/
	_addEventListeners() {
		this._formElement.addEventListener("reset", () => {
			this._disableSubmitButton();
			this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      });
		});
		this._inputList.forEach((inputElement) => {
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
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._data.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._data.errorClass);
	}

	/**
	 * Скрывает текст ошибки.
	 * @param {Node} inputElement
	 */
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  	inputElement.classList.remove(this._data.inputErrorClass);
  	errorElement.classList.remove(this._data.errorClass);
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
			this._buttonElement.classList.remove(this._data.inactiveButtonClass);
			this._buttonElement.removeAttribute("disabled");
		}
	}

	_disableSubmitButton() {
		this._buttonElement.classList.add(this._data.inactiveButtonClass);
		this._buttonElement.setAttribute("disabled", "disabled");
	}

	/**
	 * Проверяет, есть ли хотя бы один невалидный инпут.
	 * @param {Node[]} inputList
	 */
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	/**
	 * Метод, который включает валидацию формы.
	 */
	enableValidation() {
		this._addEventListeners()
	}
}