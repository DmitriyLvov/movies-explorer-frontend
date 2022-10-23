import { useEffect, useState } from 'react';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  screenWidth,
  qty,
  likeMovie,
  dislikeMovie,
  getAllMovies,
  savedMovies,
  allMovies,
}) {
  const [findedMovies, setFindedMovies] = useState([]);
  const [textError, setTextError] = useState('');

  const {
    saveSearchDataToLocalStore,
    getSearchDataFromLocalStore,
    searchMovie,
  } = useMovieManipulations();

  useEffect(() => {
    // Проверка сохраненных данных в localStore
    const localData = getSearchDataFromLocalStore();
    if (localData) {
      setFindedMovies(localData.findedMovies);
    }
  }, []);

  const searchMovieHandler = (e) => {
    // Сбрасываем текст ошибки
    e.preventDefault();
    setTextError('');
    const elements = e.target?.elements
      ? e.target.elements
      : e.target.form.elements;
    const { movie, isShortMovies } = elements;
    // Если в строке поиска присутствует ключевое слово
    if (movie.value.length > 0) {
      // Если это первый поиск, то делаем запрос к серверу
      if (allMovies.length === 0) {
        getAllMovies()
          .then((res) => {
            console.log(res);
            const { allMovies, savedMovies } = res;
            const searchResult = searchMovie(
              allMovies,
              movie.value,
              isShortMovies.checked,
              savedMovies,
            );
            setFindedMovies(searchResult);
            // Если поиск с 0 результатом, то выдаем ошибку
            if (searchResult.length === 0) {
              setTextError('Ничего не найдено');
            }
            // Сохраняем данные в localStore
            saveSearchDataToLocalStore({
              searchText: movie.value,
              isShortMovies: isShortMovies.checked,
              findedMovies: searchResult,
              movies: allMovies,
            });
          })
          .catch((e) => {
            console.log(
              `При запросе к БД фильмов произошла ошибка: ${e.message}`,
            );
            setTextError(
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
            );
          });
      } // Если это последующий запрос, то производим поиск в сохраненных результатах
      else {
        const searchResult = searchMovie(
          allMovies,
          movie.value,
          isShortMovies.checked,
          savedMovies,
        );
        setFindedMovies(searchResult);
        // Если поиск с 0 результатом, то выдаем ошибку
        if (searchResult.length === 0) {
          setTextError('Ничего не найдено');
        }
        saveSearchDataToLocalStore({
          searchText: movie.value,
          isShortMovies: isShortMovies.checked,
          findedMovies: searchResult,
          movies: allMovies,
        });
      }
    } else {
      setTextError('Нужно ввести ключевое слово');
    }
  };

  return (
    <div className="movies">
      <Header type="movies" screenWidth={screenWidth} />
      <main>
        <SearchForm
          searchMovieHandler={searchMovieHandler}
          screenWidth={screenWidth}
          type="movies"
        />
        <MoviesCardList
          qty={qty}
          type="movies"
          movies={findedMovies}
          screenWidth={screenWidth}
          dislikeMovie={dislikeMovie}
          likeMovie={likeMovie}
          textError={textError}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
