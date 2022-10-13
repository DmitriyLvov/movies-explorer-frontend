import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

function FilterCheckobox() {
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
    <div className="filter-checkbox">
      {screenWidth > 570 && <div className="filter-checkbox__vertical-line" />}
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        id="switch"
      />
      <label className="filter-checkbox__switch" htmlFor="switch" />
      <p className="filter-checkbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckobox;
