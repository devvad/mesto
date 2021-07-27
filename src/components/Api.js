import { titleProfile } from "../utils/constants";

export default class Api {
  constructor(confing) {
    this._headers = confing.headers
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получаем список всех карточек
  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkError);
  }

  //получаем информацию пользователя
  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkError);
  }

  //обновляем аватар
  newAvatar(avatarUrl) {
    const newConfing = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl['avatar']
      }),

    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar`, newConfing)
    .then(this._checkError);
  }

  // удаляем карточку
  removeCard(cardId) {
    const newConfing = {
      headers: this._headers,
      method: 'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/${cardId}`, newConfing)
    .then(this._checkError);
  }

  // ставим лайк
  putLike(cardId) {
    const newConfing = {
      headers: this._headers,
      method: 'PUT',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${cardId}`, newConfing)
    .then(this._checkError);
  }

  // удаляем лайк
  removeLike(cardId) {
    const newConfing = {
      headers: this._headers,
      method: 'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${cardId}`, newConfing)
    .then(this._checkError);
  }

  // отправляем информацию
  patchProfileInfo(data) {
    const newConfing = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        title: titleProfile,
        subtitle: subtitleProfile
      }),
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me', newConfing)
    .then(this._checkError);
  }

  //отправляем информацию о пользователе на сервер
  patchCard(data) {
    const newConfing = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data['InputNameCard'],
        link: data['InputImgCard']
      }),

  }
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', newConfing)
  .then(this._checkError);
}
}