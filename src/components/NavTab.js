import React from 'react';

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__panel">
        <li>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="navigation__link"
          >
            О проекте
          </a>
        </li>
        <li>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="navigation__link"
          >
            Технологии
          </a>
        </li>
        <li>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="navigation__link"
          >
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
