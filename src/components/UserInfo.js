export default class UserInfo{
  constructor({titleProfile, subtitleProfile}) {
    this._title = titleProfile;
    this._subtitle = subtitleProfile;
  }

  getUserInfo(){
    return {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent
    }
  }

  setUserInfo({title, subtitle}){
    this._title.textContent = title;
    this._subtitle.textContent = subtitle;
  }
}