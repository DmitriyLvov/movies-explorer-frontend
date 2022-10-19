import { Link, useLocation } from 'react-router-dom';
import accountIcon from '../../images/icon__account.svg';
import './NavigationPopup.css';

function NavigationPopup({ closeNavPopupHandler }) {
  const { pathname } = useLocation();

  return (
    <section className="navigation-popup">
      <div className="navigation-popup__panel">
        <div
          className="navigation-popup__close-button"
          onClick={closeNavPopupHandler}
        />
        <nav className="navigation-popup__links">
          <ul className="navigation-popup__pages">
            <Link to="/" className="navigation-popup__page">
              <li className="navigation-popup__page">
                <span
                  className={`${
                    pathname === '/'
                      ? 'navigation-popup__text navigation-popup__text_actived'
                      : 'navigation-popup__text'
                  }`}
                >
                  Главная
                </span>
              </li>
            </Link>
            <Link to="/movies" className="navigation-popup__page">
              <li className="navigation-popup__page">
                <span
                  className={`${
                    pathname === '/movies'
                      ? 'navigation-popup__text navigation-popup__text_actived'
                      : 'navigation-popup__text'
                  }`}
                >
                  Фильмы
                </span>
              </li>
            </Link>
            <Link to="/saved-movies" className="navigation-popup__page">
              <li className="navigation-popup__page">
                <span
                  className={`${
                    pathname === '/saved-movies'
                      ? 'navigation-popup__text navigation-popup__text_actived'
                      : 'navigation-popup__text'
                  }`}
                >
                  Сохраненные фильмы
                </span>
              </li>
            </Link>
          </ul>
          <Link to="/profile" className="navigation-popup__profile-button">
            <img
              className="navigation-popup__icon"
              src={accountIcon}
              alt="account icon"
            />
            Аккаунт
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default NavigationPopup;
