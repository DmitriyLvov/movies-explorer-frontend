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
}

const mainApi = new MainApi('http://dlvov.nomorepartiesxyz.ru', {
  'Content-Type': 'application/json',
  origin: 'http://localhost:3000',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
});
export default mainApi;
