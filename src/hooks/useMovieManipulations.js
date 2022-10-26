import { SHORT_MOVIE_MAX_LENGTH } from '../constants/constants';

function useMovieManipulations() {
  const saveSearchDataToLocalStore = (localData) => {
    const {
      searchText = '',
      isShortMovies = false,
      findedMovies = [],
      movies = [],
    } = localData;
    localStorage.setItem(
      'SearchData',
      JSON.stringify({
        searchText,
        isShortMovies,
        findedMovies,
        movies,
      }),
    );
  };
  const getSearchDataFromLocalStore = () => {
    return JSON.parse(localStorage.getItem('SearchData'));
  };

  const searchMovie = (allMovies, searchPhrase, isShortMovies, likedMovies) => {
    const findedMovies = isShortMovies
      ? allMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) &&
            movie.duration <= SHORT_MOVIE_MAX_LENGTH,
        )
      : allMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) &&
            movie.duration > SHORT_MOVIE_MAX_LENGTH,
        );
    if (likedMovies) {
      findedMovies.forEach((movie) => {
        const movieIndex = likedMovies.findIndex(
          (likedMovie) => likedMovie.movieId === movie.id,
        );
        if (movieIndex > -1) {
          movie.isLiked = true;
          movie._id = likedMovies[movieIndex]._id;
        } else {
          movie.isLiked = false;
        }
      });
    }

    return findedMovies;
  };

  return {
    saveSearchDataToLocalStore,
    getSearchDataFromLocalStore,
    searchMovie,
  };
}

export default useMovieManipulations;
