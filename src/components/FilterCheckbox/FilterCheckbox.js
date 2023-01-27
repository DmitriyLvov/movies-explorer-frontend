import { useState, useEffect } from 'react';
import useMovieManipulations from '../../hooks/useMovieManipulations';
import { SCREEN_MOBILE_MAX_WIDTH } from '../../constants/constants';
import './FilterCheckbox.css';

function FilterCheckobox({ screenWidth, searchMovieHandler }) {
  const [checked, setChecked] = useState(false);

  const { getSearchDataFromLocalStore } = useMovieManipulations();

  // Получение из LocalStore состояния checkbox при монтировании
  useEffect(() => {
    const localData = getSearchDataFromLocalStore();
    if (localData) {
      setChecked(localData.isShortMovies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStateHandle = (e) => {
    setChecked(!checked);
    setTimeout(() => searchMovieHandler(e), 0);
  };

  return (
    <div className="filter-checkbox">
      {screenWidth > SCREEN_MOBILE_MAX_WIDTH && (
        <div className="filter-checkbox__vertical-line" />
      )}
      {
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          id="switch"
          name="isShortMovies"
          onChange={changeStateHandle}
          checked={checked}
        />
      }

      <label className="filter-checkbox__switch" htmlFor="switch" />
      <p className="filter-checkbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckobox;
