import { getResponseData } from './utils';

class MoviesApi {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getMovies = () => {
    //Запрос данных с сервера
    return fetch(`${this._baseURL}/beatfilm-movies`, {
      headers: {
        ...this._headers,
      },
      method: 'GET',
    }).then((res) => getResponseData(res));
  };
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co', {
  'Content-Type': 'application/json',
});
export default moviesApi;
