import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  qty,
  type,
  movies,
  dislikeMovie,
  likeMovie,
  textError,
}) {
  const [currentQty, setCurrentQty] = useState(qty);

  const moreHandler = () => {
    setCurrentQty(currentQty + qty);
  };

  return movies.length > 0 && textError === '' ? (
    <>
      <ul className="movies-card-list">
        {movies.map((movie, index) => {
          if (index < currentQty) {
            return (
              <MoviesCard
                key={type === 'movies' ? movie.id : movie._id}
                card={movie}
                type={type}
                dislikeMovie={dislikeMovie}
                likeMovie={likeMovie}
              />
            );
          }
        })}
      </ul>
      {movies.length > currentQty && (
        <button
          className="movies-card-list__button"
          type="button"
          onClick={moreHandler}
        >
          Ещё
        </button>
      )}
    </>
  ) : (
    <p className="movies-card-list__error">{textError}</p>
  );
}

export default MoviesCardList;
