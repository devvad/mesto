export default class UserInfo {
	constructor(titleProfileSelector, subtitleProfileSelector, editAvatarButtonSelector) {
		this._titleProfile = document.querySelector(titleProfileSelector);
		this._subtitleProfile = document.querySelector(subtitleProfileSelector);
		this._editAvatarButton = document.querySelector(editAvatarButtonSelector);
	}

  getUserInfo() {
    return {
      name: this._titleProfile.textContent,
      about: this._subtitleProfile.textContent
    }
  }

  setUserInfo(data) {
    this._titleProfile.textContent = data.name;
    this._subtitleProfile.textContent = data.about;
  }

	setUserAvatar(avatar) {
		this._editAvatarButton.style.backgroundImage = `url(${avatar})`;
	}

	setUserId(id) {
		this._userId = id;
	}

	getUserId() {
		return this._userId;
	}
}