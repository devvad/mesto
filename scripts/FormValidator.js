export default class FormValidator {
	constructor(data, formElement) {
		this.data = data;
		this.formElement = formElement;
	}

	/**
 	* Навешивает все обработчики события на форму.
 	*/
	_addEventListeners() {
		const inputList = Array.from(this.formElement.querySelectorAll(this.data.inputSelector));
		const buttonElement = this.formElement.querySelector(this.data.submitButtonSelector);
		const self = this;
		inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", function () {
				self._checkInputValidity(inputElement);
				self._toggleButtonState(inputList, buttonElement);
			});
		});
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
	_toggleButtonState(inputList, buttonElement) {
		if (this._hasInvalidInput (inputList)) {
			buttonElement.classList.add(this.data.inactiveButtonClass);
			buttonElement.setAttribute("disabled", "disabled");
		} else {
			buttonElement.classList.remove(this.data.inactiveButtonClass);
			buttonElement.removeAttribute("disabled");
		}
	}

	/**
	 * Проверяет, есть ли хотя бы один невалидный инпут.
	 * @param {Node[]} inputList
	 */
	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
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