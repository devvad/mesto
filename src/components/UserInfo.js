export default class UserInfo {
	constructor(titleProfileSelector, subtitleProfileSelector, editAvatarButtonSelector) {
		this._titleProfile = document.querySelector(titleProfileSelector);
		this._subtitleProfile = document.querySelector(subtitleProfileSelector);
		this._editAvatarButton = document.querySelector(editAvatarButtonSelector);
	}

  getUserInfo() {
    return {
      title: this._titleProfile.textContent,
      subtitle: this._subtitleProfile.textContent
    }
  }

  setUserInfo({title, subtitle}) {
    this._titleProfile.textContent = title;
    this._subtitleProfile.textContent = subtitle;
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