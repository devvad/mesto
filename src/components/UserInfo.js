import {titleProfile, subtitleProfile, popupEditAvatar} from "../utils/constants.js";
export default class UserInfo {
  getUserInfo() {
    return {
      title: titleProfile.textContent,
      subtitle: subtitleProfile.textContent
    }
  }

  setUserInfo({title, subtitle}) {
    titleProfile.textContent = title;
    subtitleProfile.textContent = subtitle;
  }

	setUserAvatar(avatar) {
		popupEditAvatar.style.backgroundImage = `url(${avatar})`;
	}

	setUserId(id) {
		this._userId = id;
	}

	getUserId() {
		return this._userId;
	}
}