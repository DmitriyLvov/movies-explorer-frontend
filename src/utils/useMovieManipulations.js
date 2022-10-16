function useMovieManipulations() {
  const saveDataToLocalStore = (localData) => {
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
  const getDataToLocalStore = () => {
    return JSON.parse(localStorage.getItem('SearchData'));
  };

  const searchMovie = (allMovies, searchPhrase, isShortMovies) => {
    const findedMovies = allMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchPhrase.toLowerCase()),
    );
    return findedMovies;
  };



  return { saveDataToLocalStore, getDataToLocalStore, searchMovie };
}

export default useMovieManipulations;
