const showInputError = (popupElement, inputElement, errorMessage, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (popupElement, inputElement, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (popupElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(popupElement, inputElement, settings);
  }
};

const setEventListeners = (popupElement, settings) => {
  const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
	const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(popupElement, inputElement, settings);
			toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const popups = Array.from(document.querySelectorAll(settings.popupSelector));
  popups.forEach((popup) => {
		setEventListeners(popup, settings);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput (inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
		buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
		buttonElement.removeAttribute("disabled");
  }
}

enableValidation({
  popupSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active"
});