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

  // Метод получения списка всех карточек пользователя:
  getInitialCards() {
    return this._fetch("cards", {
      method: 'GET',
    })
  }

  // Метод получения информации о пользователе:
  getUserInfo() {
    return this._fetch("users/me", {
      method: 'GET',
    })
  }

  // Метод обновления аватара:
  newAvatar(data) {
    return this._fetch("users/me/avatar", {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Метод удаления карточки:
  removeCard(cardId) {
    return this._fetch(`cards/${cardId}`, {
      method: 'DELETE',
    })
  }

  // Метод простановки лайка у карточки:
  putLike(cardId) {
    return this._fetch(`cards/likes/${cardId}`, {
      method: 'PUT',
    })
  }

  // Метод удаления лайка у карточки:
  removeLike(cardId) {
    return this._fetch(`cards/likes/${cardId}`, {
      method: 'DELETE',
    })
  }

  // Метод обновления информации о пользователе:
  addProfileInfo(data) {
    return this._fetch("users/me", {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Добавление новой карточки на сервер:
  addCard(data) {
  	return this._fetch("cards", {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}
}