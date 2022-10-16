import { useEffect, useState } from 'react';
import FilterCheckobox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon-search.svg';
import forwardIcon from '../../images/icon-forward.svg';
import useMovieManipulations from '../../utils/useMovieManipulations';
import './SearchForm.css';

function SearchForm({ searchMovieHandler, screenWidth }) {
  const [inputText, setInputText] = useState('');
  const { getDataToLocalStore } = useMovieManipulations();
  useEffect(() => {
    const localData = getDataToLocalStore();
    if (localData) {
      setInputText(localData.searchText);
    }
  }, []);

  const [inputClass, setInputClass] = useState('search-form__input-wrapper');

  return (
    <section className="search-form">
      <form className="search-form__search-field" onSubmit={searchMovieHandler}>
        <div className={inputClass}>
          {screenWidth > 570 && (
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
            required
          />
          <button type="submit" className="search-from__button">
            <img
              src={forwardIcon}
              alt="search button"
              className="search-form__forward-icon"
            />
          </button>
        </div>
        <FilterCheckobox />
      </form>
    </section>
  );
}

export default SearchForm;
