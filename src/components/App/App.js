import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useMovieManipulations from '../../utils/useMovieManipulations';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import './App.css';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { saveDataToLocalStore, getDataToLocalStore, searchMovie } =
    useMovieManipulations();
  useEffect(() => {
    // Проверка сохраненных данных в localStore
    const localData = getDataToLocalStore();
    if (localData) {
      setFindedMovies(localData.findedMovies);
    }
  }, []);

  const searchMovieHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { movie, isShortMovies } = e.target.elements;
    // Если это первый поиск, то делаем запрос к серверу
    if (allMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          setIsLoading(false);
          console.log(res);
          setFindedMovies(searchMovie(res, movie.value, isShortMovies.checked));
          // allMovies.filter(movie)
        })
        .catch((e) =>
          console.log(
            `При запросе к БД фильмов произошла ошибка: ${e.message}`,
          ),
        )
        .finally(() => {
          setIsLoading(false);
        });
    } // Если это последующий запрос, то производим поиск в сохраненных результатах
    else {
      setFindedMovies(
        searchMovie(allMovies, movie.value, isShortMovies.checked),
      );
      setIsLoading(false);
    }
    // Сохраняем данные в localStore
    saveDataToLocalStore({
      searchText: movie.value,
      isShortMovies: isShortMovies.checked,
      findedMovies,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  function changeWindowSize() {
    setScreenWidth(window.innerWidth);
  }
  return (
    <div className="root">
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          exact
          path="/movies"
          element={
            <Movies
              screenWidth={screenWidth}
              findedMovies={findedMovies}
              searchMovieHandler={searchMovieHandler}
              isLoading={isLoading}
            />
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <SavedMovies
              screenWidth={screenWidth}
              searchMovieHandler={searchMovieHandler}
              isLoading={isLoading}
              findedMovies={findedMovies}
            />
          }
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
