import './MoviesCard.css';

function MoviesCard({ card, type }) {
  const { duration, image } = card;
  const previewPath = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;

  const getTimeFromDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
  };

  return (
    <li className="movies-card">
      <div className="movie-card__description">
        <div className="movie-card__info">
          <p className="movie-card__name">{card.nameRU}</p>
          <p className="movie-card__time">{getTimeFromDuration(duration)}</p>
        </div>
        {type === 'movies' && (
          <button
            type="button"
            // className="movie-card__button movie-card__like movie-card__like_actived"
            className="movie-card__button movie-card__like"
          />
        )}
        {type === 'saved-movies' && (
          <button
            type="button"
            className="movie-card__button movie-card__delete"
          />
        )}
      </div>
      <img
        className="movies-card__preview"
        src={previewPath}
        alt="movie logo"
      />
    </li>
  );
}

export default MoviesCard;
