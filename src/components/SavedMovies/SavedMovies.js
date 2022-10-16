import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  searchMovieHandler,
  isLoading,
  findedMovies,
  screenWidth,
}) {
  const navigate = useNavigate();
  return (
    <div className="saved-movies">
      <Header type="movies" />
      <SearchForm
        searchMovieHandler={searchMovieHandler}
        screenWidth={screenWidth}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList qty="2" type="saved-movies" movies={findedMovies} />
      )}
      <Footer />
    </div>
  );
}

export default SavedMovies;
