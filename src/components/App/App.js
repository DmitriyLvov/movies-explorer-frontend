import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
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
  const [userReady, setUserReady] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [qtyMovies, setQtyMovies] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const { getSearchDataFromLocalStore, saveSearchDataToLocalStore } =
    useMovieManipulations();

  // Получение данных пользователя при загрузке
  useEffect(() => {
    if (!currentUser?.email) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then((res) => {
          const { name, email, _id } = res;
          setCurrentUser({ name, email, _id });
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false);
          setUserReady(true);
        });
    }
  }, []);

  // Получение маскимального количества карточек на экрана
  function getQtyMoviesByScreenWidth() {
    setQtyMovies(window.innerWidth > 570 ? 7 : 5);
  }

  // Контроль ширины экрана
  useEffect(() => {
    // Инициализируем количество карточек при начальном экране
    getQtyMoviesByScreenWidth();
    // Добавляем обработчик для отслеживания изменения экрана
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  function changeWindowSize() {
    setScreenWidth(window.innerWidth);
    getQtyMoviesByScreenWidth();
  }

  // Получение сохраненных фильмов
  const getSavedMovies = () => {
    setIsLoading(true);
    return mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        return res;
      })
      .catch((er) => console.log(er))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Получение всех фильмов
  const getAllMovies = () => {
    setIsLoading(true);
    // Если был произведен поиск сохраненных фильмов
    if (savedMovies.length > 0) {
      return moviesApi
        .getMovies()
        .then((allMovies) => {
          setAllMovies(allMovies);
          return { allMovies, savedMovies };
        })
        .catch((er) =>
          console.log('При частичном запросе произошла ошибка', er),
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
    // Если не было поиска сохраненных фильмов
    else {
      return Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies()])
        .then(([allMovies, savedMovies]) => {
          setSavedMovies(savedMovies);
          setAllMovies(allMovies);
          return { allMovies, savedMovies };
        })
        .catch((e) =>
          console.log(
            `При запросе к БД фильмов произошла ошибка: ${e.message}`,
          ),
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const correctDataByLikes = (isLiked, movie, id) => {
    if (savedMovies.length > 0) {
      if (isLiked) {
        // Добавляем при лайке
        savedMovies.splice(0, 0, movie);
      } else {
        // Удаляем при дизлайке
        const movieIndex = savedMovies.findIndex(
          (movie) => movie.movieId === id,
        );
        // Если фильм найден в сохраненных
        if (movieIndex > -1) {
          savedMovies.splice(movieIndex, 1);
        }
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
          console.log('dislike');
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
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  };

  const dislikeMovie = (id) => {
    setIsLoading(true);
    mainApi
      .dislikeMovie(id)
      .then(() => {
        correctDataByLikes(false, '', id);
      })
      .catch((er) => console.log(er))
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
      {isLoading && <Preloader />}
      <div className="root">
        <Routes>
          <Route
            path="/sign-in"
            element={currentUser?.email ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={currentUser?.email ? <Navigate to="/" /> : <Register />}
          />
          {userReady && (
            <>
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
                    getSavedMovies={getSavedMovies}
                    savedMovies={savedMovies}
                    likeMovie={likeMovie}
                    dislikeMovie={dislikeWithConfirm}
                  />
                }
              />
              <Route
                exact
                path="/profile"
                element={<ProtectedRoute element={Profile} />}
              />
            </>
          )}
          <Route exact path="/" element={<Main screenWidth={screenWidth} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
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
