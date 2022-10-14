import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <div className="movies">
      <Header type="movies" />
      <main>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList qty="5" type="movies" />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
