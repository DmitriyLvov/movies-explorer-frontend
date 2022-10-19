import './MoviesCard.css';

function MoviesCard({ card, type, dislikeMovie, likeMovie }) {
  const { duration, image } = card;
  const previewPath = image?.formats
    ? `https://api.nomoreparties.co${image.formats.thumbnail.url}`
    : card.thumbnail;

  const getTimeFromDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
  };

  const toogleLikeHandler = () => {
    if (card.isLiked) {
      dislikeMovie(type === 'movies' ? card.id : card.movieId);
    } else {
      likeMovie(card, previewPath);
    }
  };

  const deleteHandler = (e) => {
    dislikeMovie(type === 'movies' ? card.id : card.movieId);
  };

  const openYouTubeHandler = () => {
    window.open(card.trailerLink);
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
            className={
              card.isLiked
                ? 'movie-card__button movie-card__like movie-card__like_actived'
                : 'movie-card__button movie-card__like'
            }
            onClick={toogleLikeHandler}
          />
        )}
        {type === 'saved-movies' && (
          <button
            type="button"
            className="movie-card__button movie-card__delete"
            onClick={deleteHandler}
          />
        )}
      </div>
      <img
        onClick={openYouTubeHandler}
        className="movies-card__preview"
        src={previewPath}
        alt="movie logo"
        data-description="Перейти на YouTube"
      />
    </li>
  );
}

export default MoviesCard;
