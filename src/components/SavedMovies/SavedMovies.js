import { useState, useEffect } from 'react';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  screenWidth,
  qty,
  savedMovies,
  likeMovie,
  dislikeMovie,
}) {
  const [findedMovies, setFindedMovies] = useState([]);
  const [textError, setTextError] = useState('');

  const { searchMovie } = useMovieManipulations();

  // Изменение findedMovies при изменении savedMovies
  useEffect(() => {
    setFindedMovies(savedMovies);
  }, [savedMovies]);

  // Поиск по сохраненным фильмам
  const searchMovieHandler = (e) => {
    // Обновляем сообщение об ошибке
    setTextError('');
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
    } else {
      setTextError('Нужно ввести ключевое слово');
    }
  };

  return (
    <div className="saved-movies">
      <Header type="movies" screenWidth={screenWidth} />
      <SearchForm
        searchMovieHandler={searchMovieHandler}
        screenWidth={screenWidth}
      />
      {findedMovies && (
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
