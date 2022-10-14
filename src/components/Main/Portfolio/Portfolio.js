import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__item">
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Статичный сайт</p>↗
        </a>
      </div>
      <div className="portfolio__item">
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Адаптивный сайт</p>↗
        </a>
      </div>
      <div className="portfolio__item">
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Одностраничное приложение</p>↗
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
