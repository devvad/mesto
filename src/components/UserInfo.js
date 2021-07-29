import {titleProfile, subtitleProfile, profileAvatar} from "../utils/constants.js";
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
		profileAvatar.style.backgroundImage = `url(${avatar})`;
	}
}