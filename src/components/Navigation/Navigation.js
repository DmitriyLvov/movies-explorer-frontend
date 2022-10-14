import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import accountIcon from '../../images/icon__account.svg';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import './Navigation.css';

function Navigation({ type }) {
  // const location = useLocation();
  // console.log(location);

  const [navPopupVisible, setNavPopupVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  const closeNavPopup = () => {
    setNavPopupVisible(false);
  };

  const openNavPopup = () => {
    setNavPopupVisible(true);
  };

  function changeWindowSize() {
    setScreenWidth(window.innerWidth);
  }

  return (
    <>
      {type === 'main' && (
        <div>
          <Link to="/sign-up" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/sign-in">
            <button className="navigation__button">Войти</button>
          </Link>
        </div>
      )}
      {type === 'movies' && (
        <>
          {screenWidth > 768 && (
            <nav className="navigation__links">
              <ul className="navigation__navigation-panel">
                <Link
                  to="/movies"
                  className="navigation__link navigation__link_type_movies"
                >
                  <li className="navigation__link navigation__link_type_movies">
                    Фильмы
                  </li>
                </Link>
                <Link
                  to="/saved-movies"
                  className="navigation__link navigation__link_type_movies"
                >
                  <li className="navigation__link navigation__link_type_movies">
                    Сохраненные фильмы
                  </li>
                </Link>
              </ul>
              <Link to="/profile" className="navigation__profile-button">
                <img
                  className="navigation__icon"
                  src={accountIcon}
                  alt="account icon"
                />
                Аккаунт
              </Link>
            </nav>
          )}
          {screenWidth < 769 && (
            <div className="navigation__menu-button" onClick={openNavPopup}>
              <div className="navigation__menu-line" />
              <div className="navigation__menu-line" />
              <div className="navigation__menu-line" />
            </div>
          )}
          {navPopupVisible && (
            <NavigationPopup closeNavPopupHandler={closeNavPopup} />
          )}
        </>
      )}
    </>
  );
}

export default Navigation;
