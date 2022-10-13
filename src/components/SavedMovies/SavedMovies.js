import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header type="movies" />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList qty="2" type="saved-movies" />
      <Footer />
    </div>
  );
}

export default SavedMovies;
