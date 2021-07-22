import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
	constructor({src, alt}, popupSelector) {
		this._src = src;
		this._alt = alt;
		super(popupSelector);
	}

	open() {
		const image = this._rootElement.querySelector(".popup__image");
		image.setAttribute("src", this._src);
		image.setAttribute("alt", this._alt);

		const galleryFigcaption = this._rootElement.querySelector(".popup__figcaption");
		galleryFigcaption.innerText = this._alt;
		super();
	}
}