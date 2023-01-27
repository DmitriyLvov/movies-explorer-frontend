import { useEffect, useState } from 'react';
import FilterCheckobox from '../FilterCheckbox/FilterCheckbox';
import { SCREEN_MOBILE_MAX_WIDTH } from '../../constants/constants';
import searchIcon from '../../images/icon-search.svg';
import forwardIcon from '../../images/icon-forward.svg';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import './SearchForm.css';

function SearchForm({ searchMovieHandler, screenWidth, type }) {
  const [inputText, setInputText] = useState('');
  const { getSearchDataFromLocalStore } = useMovieManipulations();
  useEffect(() => {
    if (type === 'movies') {
      const localData = getSearchDataFromLocalStore();
      if (localData) {
        setInputText(localData.searchText);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputClass, setInputClass] = useState('search-form__input-wrapper');

  return (
    <section className="search-form">
      <form className="search-form__search-field" onSubmit={searchMovieHandler}>
        <div className={inputClass}>
          {screenWidth > SCREEN_MOBILE_MAX_WIDTH && (
            <img
              className="search-form__search-icon"
              src={searchIcon}
              alt="magnifying glass"
            />
          )}
          <input
            type="text"
            name="movie"
            placeholder="Фильм"
            className="search-form__input"
            defaultValue={inputText}
            onFocus={() =>
              setInputClass(
                'search-form__input-wrapper search-form__input-wrapper_actived',
              )
            }
            onBlur={() => setInputClass('search-form__input-wrapper')}
          />
          <button type="submit" className="search-from__button">
            <img
              src={forwardIcon}
              alt="search button"
              className="search-form__forward-icon"
            />
          </button>
        </div>
        <FilterCheckobox
          screenWidth={screenWidth}
          searchMovieHandler={searchMovieHandler}
        />
      </form>
    </section>
  );
}

export default SearchForm;
