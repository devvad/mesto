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

  setUserInfo(item){
    this._title.textContent = item['input-title'];
    this._subtitle.textContent = item['input-subtitle'];
  }
}