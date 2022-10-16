import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({ screenWidth, findedMovies, searchMovieHandler, isLoading }) {
  return (
    <div className="movies">
      <Header type="movies" />
      <main>
        <SearchForm
          searchMovieHandler={searchMovieHandler}
          screenWidth={screenWidth}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            qty="5"
            type="movies"
            movies={findedMovies}
            screenWidth
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
