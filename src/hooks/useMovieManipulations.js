function useMovieManipulations() {
  const saveSearchDataToLocalStore = (localData) => {
    const {
      searchText = '',
      isShortMovies = false,
      findedMovies = [],
    } = localData;
    localStorage.setItem(
      'SearchData',
      JSON.stringify({
        searchText,
        isShortMovies,
        findedMovies,
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
            (movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) ||
              movie.description
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())) &&
            movie.duration < 41,
        )
      : allMovies.filter(
          (movie) =>
            (movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) ||
              movie.description
                .toLowerCase()
                .includes(searchPhrase.toLowerCase())) &&
            movie.duration > 40,
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
