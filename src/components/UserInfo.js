import {titleProfile, subtitleProfile, profileAvatar} from "../utils/constants.js";
export default class UserInfo {
  getUserInfo(){
    return {
      title: titleProfile.textContent,
      subtitle: subtitleProfile.textContent
    }
  }

  setUserInfo({title, subtitle, avatar}){
    titleProfile.textContent = title;
    subtitleProfile.textContent = subtitle;
		profileAvatar.style.backgroundImage = `url(${avatar})`;
  }
}