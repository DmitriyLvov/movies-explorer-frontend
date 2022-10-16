import { useState, useEffect } from 'react';
import useMovieManipulations from '../../utils/useMovieManipulations';
import './FilterCheckbox.css';

function FilterCheckobox() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [checked, setChecked] = useState(false);

  const { getDataToLocalStore } = useMovieManipulations();

  // Получение из LocalStore состояния checkbox при монтировании
  useEffect(() => {
    const localData = getDataToLocalStore();
    if (localData) {
      setChecked(localData.isShortMovies);
    }
  }, []);

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
    <div className="filter-checkbox">
      {screenWidth > 570 && <div className="filter-checkbox__vertical-line" />}
      {
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          id="switch"
          name="isShortMovies"
          onChange={() => setChecked(!checked)}
          checked={checked}
        />
      }

      <label className="filter-checkbox__switch" htmlFor="switch" />
      <p className="filter-checkbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckobox;
