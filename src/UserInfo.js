export default class UserInfo{
  constructor({nameProfile, aboutProfile}) {
    this._name = nameProfile;
    this._about = aboutProfile;
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(item){
    this._name.textContent = item['input-name'];
    this._about.textContent = item['input-about'];
  }
}