import MoviesCard from '../MoviesCard/MoviesCard';
import { movies } from '../../utils/movies';
import './MoviesCardList.css';

function MoviesCardList({ qty, type }) {
  return (
    <>
      <ul className="movies-card-list">
        {movies.map((movie, index) => {
          if (index < qty) {
            return <MoviesCard key={movie.id} card={movie} type={type} />;
          }
        })}
      </ul>
      {qty >= 5 && (
        <button className="movies-card-list__button" type="button">
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
