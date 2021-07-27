const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-26/";

export default class Api {
  constructor(confing) {
    this._headers = confing.headers
  }

	_fetch(url, config) {
		return fetch(`${baseUrl}${url}`, {
			headers: this._headers,
			...config
		})
		.then(this._checkError);
	}

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получаем список всех карточек
  getInitialCards() {
    return this._fetch("cards", {
      method: 'GET',
    })
  }

  //получаем информацию пользователя
  getUserInfo() {
    return this._fetch("users/me", {
      method: 'GET',
    })
  }

  //обновляем аватар
  newAvatar(data) {
    return this._fetch("users/me/avatar", {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // удаляем карточку
  removeCard(cardId) {
    return this._fetch(`cards/${cardId}`, {
      method: 'DELETE',
    })
  }

  // ставим лайк
  putLike(cardId) {
    return this._fetch(`cards/likes/${cardId}`, {
      method: 'PUT',
    })
  }

  // удаляем лайк
  removeLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: 'DELETE',
    })
  }

  // отправляем информацию
  patchProfileInfo(data) {
    return this._fetch("users/me", {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  //отправляем информацию о пользователе на сервер
  patchCard(data) {
  	return this._fetch("cards", {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}
}