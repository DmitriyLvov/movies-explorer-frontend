import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text footer__text_header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__panel">
        <p className="footer__text">&copy; 2022</p>
        <div className="footer__links">
          <a
            className="footer__text footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__text footer__link"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
