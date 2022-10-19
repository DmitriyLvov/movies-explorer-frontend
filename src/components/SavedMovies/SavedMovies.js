import { useState, useEffect } from 'react';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './SavedMovies.css';

function SavedMovies({
  screenWidth,
  qty,
  savedMovies,
  getSavedMovies,
  likeMovie,
  dislikeMovie,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [findedMovies, setFindedMovies] = useState([]);
  const [textError, setTextError] = useState('');

  const { searchMovie } = useMovieManipulations();

  // Получение стартовой страницы с БД
  useEffect(() => {
    if (savedMovies.length === 0) {
      setIsLoading(true);
      getSavedMovies()
        .then((res) => {
          setFindedMovies(res);
        })
        .catch((er) => console.log(er))
        .finally(() => setIsLoading(false));
    } else {
      setFindedMovies(savedMovies);
    }
  }, []);

  // Изменение findedMovies при изменении savedMovies
  useEffect(() => {
    setFindedMovies(savedMovies);
  }, [savedMovies]);

  // Поиск по сохраненным фильмам
  const searchMovieHandler = (e) => {
    e.preventDefault();
    const elements = e.target?.elements
      ? e.target.elements
      : e.target.form.elements;
    const { movie, isShortMovies } = elements;
    if (movie.value.length > 0) {
      const searchResult = searchMovie(
        savedMovies,
        movie.value,
        isShortMovies.checked,
      );
      setFindedMovies(searchResult);
      if (searchResult.length === 0) {
        setTextError('Ничего не найдено');
      }
    }
  };

  return (
    <div className="saved-movies">
      <Header type="movies" screenWidth={screenWidth} />
      <SearchForm
        searchMovieHandler={searchMovieHandler}
        screenWidth={screenWidth}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          qty={qty}
          type="saved-movies"
          movies={findedMovies}
          dislikeMovie={dislikeMovie}
          likeMovie={likeMovie}
          textError={textError}
        />
      )}
      <Footer />
    </div>
  );
}

export default SavedMovies;
