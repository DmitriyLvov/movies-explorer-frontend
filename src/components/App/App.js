import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import {
  QTY_MOVIES_DESKTOP,
  QTY_MOVIES_MOBILE,
  SCREEN_MOBILE_MAX_WIDTH,
} from '../../constants/constants';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [qtyMovies, setQtyMovies] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const { getSearchDataFromLocalStore, saveSearchDataToLocalStore } =
    useMovieManipulations();

  // Получение данных пользователя и фильмов из хранилища
  useEffect(() => {
    const localData = getSearchDataFromLocalStore();
    // Если есть данные фильмов
    if (localData) {
      setAllMovies(localData.movies);
    }
    setIsLoading(true);
    // Запрос данных пользователя и сохраненных фильмов
    if (!currentUser?.email) {
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          const { name, email, _id } = userInfo;
          setCurrentUser({ name, email, _id });
          setIsLogin(true);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Получаем сохраненные фильмы для пользователя
  useEffect(() => {
    if (isLogin) {
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLogin]);

  // Контроль ширины экрана
  useEffect(() => {
    // Инициализируем количество карточек при начальном экране
    getQtyMoviesByScreenWidth();
    // Добавляем обработчик для отслеживания изменения экрана
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Получение маскимального количества карточек на экрана
  function getQtyMoviesByScreenWidth() {
    setQtyMovies(
      window.innerWidth > SCREEN_MOBILE_MAX_WIDTH
        ? QTY_MOVIES_DESKTOP
        : QTY_MOVIES_MOBILE,
    );
  }

  function changeWindowSize() {
    setScreenWidth(window.innerWidth);
    getQtyMoviesByScreenWidth();
  }

  // Получение всех фильмов
  const getAllMovies = () => {
    // Если был произведен поиск и данные есть в Store
    if (allMovies.length > 0) {
      return { allMovies, savedMovies };
    }
    // Если коллекция всех фильмов пуста
    setIsLoading(true);
    // Если есть сохраненные данные, но не было первичного поиска
    return moviesApi
      .getMovies()
      .then((allMovies) => {
        setAllMovies(allMovies);
        return { allMovies, savedMovies };
      })
      .catch((e) =>
        console.log(`При запросе к БД фильмов произошла ошибка: ${e.message}`),
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Выход пользователя из сеанса
  const logOut = () => {
    localStorage.removeItem('SearchData');
    setCurrentUser({});
    localStorage.removeItem('jwt');
    // Очищаем состояние для сохраненных фильмов
    setSavedMovies([]);
    setIsLogin(false);
  };

  const checkErrorHandler = (e) => {
    if (e === 401) {
      console.log('LogOut');
      logOut();
    } else {
      console.log(e);
    }
  };

  const correctDataByLikes = (isLiked, movie, id) => {
    // Корректируем сохраненные фильмы
    if (isLiked) {
      // Добавляем при лайке
      savedMovies.splice(0, 0, movie);
    } else {
      // Удаляем при дизлайке
      const movieIndex = savedMovies.findIndex((movie) => movie.movieId === id);
      // Если фильм найден в сохраненных
      if (movieIndex > -1) {
        savedMovies.splice(movieIndex, 1);
      }
    }

    // Если присутствуют данные в localStore
    const localData = getSearchDataFromLocalStore();
    if (localData?.findedMovies.length > 0) {
      const movieIndex = localData.findedMovies.findIndex(
        (movie) => movie.id === id,
      );
      if (movieIndex > -1) {
        if (isLiked) {
          localData.findedMovies[movieIndex].isLiked = true;
        } else {
          localData.findedMovies[movieIndex].isLiked = false;
        }
        saveSearchDataToLocalStore(localData);
      }
    }
  };

  const likeMovie = (card, previewPath) => {
    setIsLoading(true);
    const {
      id,
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year,
    } = card;
    mainApi
      .likeMovie({
        country,
        director,
        duration,
        year,
        description,
        image: previewPath,
        trailerLink,
        thumbnail: previewPath,
        movieId: id,
        nameRU,
        nameEN,
      })
      .then((movie) => {
        correctDataByLikes(true, movie, movie.movieId);
      })
      .catch(checkErrorHandler)
      .finally(() => setIsLoading(false));
  };

  const dislikeMovie = (id) => {
    setIsLoading(true);
    mainApi
      .dislikeMovie(id)
      .then(() => {
        correctDataByLikes(false, '', id);
      })
      .catch(checkErrorHandler)
      .finally(() => setIsLoading(false));
  };

  const dislikeWithConfirm = (id) => {
    setDeleteId(id);
    setConfirmVisible(true);
  };

  const popupDislike = (e) => {
    e.preventDefault();
    setConfirmVisible(false);
    dislikeMovie(deleteId);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="root">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path="/sign-in"
              element={
                currentUser?.email ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsLogin={setIsLogin} />
                )
              }
            />
            <Route
              path="/sign-up"
              element={
                currentUser?.email ? (
                  <Navigate to="/" />
                ) : (
                  <Register setIsLogin={setIsLogin} />
                )
              }
            />
            <Route
              exact
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  screenWidth={screenWidth}
                  qty={qtyMovies}
                  getAllMovies={getAllMovies}
                  savedMovies={savedMovies}
                  allMovies={allMovies}
                  likeMovie={likeMovie}
                  dislikeMovie={dislikeMovie}
                />
              }
            />
            <Route
              exact
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  screenWidth={screenWidth}
                  qty={qtyMovies}
                  savedMovies={savedMovies}
                  likeMovie={likeMovie}
                  dislikeMovie={dislikeWithConfirm}
                />
              }
            />
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute element={Profile} logOut={logOut} />}
            />
            <Route
              exact
              path="/"
              element={<Main screenWidth={screenWidth} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        )}
        <PopupWithForm
          visible={confirmVisible}
          title="Вы хотите удалить фильм?"
          buttonText="Да"
          onClose={() => setConfirmVisible(false)}
          onSubmit={popupDislike}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
