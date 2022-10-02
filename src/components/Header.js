import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header__logo" />
      <div>
        <a href="" className="header__link">
          Регистрация
        </a>
        <button type="button" className="header__button">
          Войти
        </button>
      </div>
    </header>
  );
}

export default Header;
