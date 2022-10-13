import { useEffect, useState } from 'react';
import FilterCheckobox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/icon-search.svg';
import forwardIcon from '../../images/icon-forward.svg';
import './SearchForm.css';

function SearchForm() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  function changeWindowSize() {
    setScreenWidth(window.innerWidth);
  }

  return (
    <section className="search-form">
      <div className="search-form__search-field">
        <div className="search-form__input-wrapper">
          {screenWidth > 570 && (
            <img
              className="search-form__search-icon"
              src={searchIcon}
              alt="magnifying glass"
            />
          )}
          <input
            type="text"
            placeholder="Фильм"
            className="search-form__input"
          />
          <button type="button" className="search-from__button">
            <img
              src={forwardIcon}
              alt="search button"
              className="search-form__forward-icon"
            />
          </button>
        </div>
        <FilterCheckobox />
      </div>
    </section>
  );
}

export default SearchForm;
