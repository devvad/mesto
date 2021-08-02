import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._galleryFigcaption = this._rootElement.querySelector(".popup__figcaption");
		this._image = this._rootElement.querySelector(".popup__image");
	}

	open({src, alt}) {
		this._image.setAttribute("src", src);
		this._image.setAttribute("alt", alt);
		this._galleryFigcaption.textContent = alt;
		return super.open();
	}
}