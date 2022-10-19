import { getResponseData } from './utils';

class MainApi {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }
  // Незазищенные роутеры
  //Регистрация пользоввателя
  registerNewUser = (data) => {
    const { email, password, name } = data;
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => getResponseData(res));
  };
  // Вход для зарегистрированных пользователей
  login = (data) => {
    const { email, password } = data;
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => getResponseData(res));
  };

  // Получение информации о пользователе
  getUserInfo = () => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then((res) => getResponseData(res));
  };

  // Изменение информации о пользователе
  changeUserInfo = ({ name, email }) => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => getResponseData(res));
  };

  // Получение сохраненных фильмов
  getSavedMovies = () => {
    return fetch(`${this._baseURL}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then((res) => getResponseData(res));
  };

  // Добавление фильма в избранное
  likeMovie = (movie) => {
    return fetch(`${this._baseURL}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      body: JSON.stringify(movie),
    }).then((res) => getResponseData(res));
  };

  // Удаление фильма из избранного
  dislikeMovie = (_id) => {
    return fetch(`${this._baseURL}/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then((res) => getResponseData(res));
  };
}

const mainApi = new MainApi('http://dlvov.nomorepartiesxyz.ru', {
  'Content-Type': 'application/json',
});

// const mainApi = new MainApi('http://localhost:5000', {
//   'Content-Type': 'application/json',
// });

export default mainApi;
