import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SCREEN_TABLET_MAX_WIDTH } from '../../constants/constants';
import accountIcon from '../../images/icon__account.svg';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import './Navigation.css';

function Navigation({ screenWidth }) {
  const { pathname } = useLocation();

  const [navPopupVisible, setNavPopupVisible] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const closeNavPopup = () => {
    setNavPopupVisible(false);
  };

  const openNavPopup = () => {
    setNavPopupVisible(true);
  };
  return (
    <>
      {currentUser?.email ? (
        <>
          {screenWidth > SCREEN_TABLET_MAX_WIDTH && (
            <nav className="navigation__links">
              <ul className="navigation__navigation-panel">
                <Link
                  to="/movies"
                  className="navigation__link navigation__link_type_movies"
                >
                  <li
                    className={`navigation__link navigation__link_type_movies ${
                      pathname === '/movies' &&
                      'navigation__link_type_movies_actived'
                    }`}
                  >
                    Фильмы
                  </li>
                </Link>
                <Link
                  to="/saved-movies"
                  className="navigation__link navigation__link_type_movies"
                >
                  <li
                    className={`navigation__link navigation__link_type_movies ${
                      pathname === '/saved-movies' &&
                      'navigation__link_type_movies_actived'
                    }`}
                  >
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
          {screenWidth <= SCREEN_TABLET_MAX_WIDTH && (
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
      ) : (
        <div>
          <Link to="/sign-up" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/sign-in">
            <button className="navigation__button">Войти</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Navigation;
