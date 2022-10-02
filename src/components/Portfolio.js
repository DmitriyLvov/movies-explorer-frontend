import React from 'react';

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__item">
        <p className="portfolio__item-text">Статичный сайт</p>
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
      <div className="portfolio__item">
        <p className="portfolio__item-text">Адаптивный сайт</p>
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
      <div className="portfolio__item">
        <p className="portfolio__item-text">Одностраничное приложение</p>
        <a
          className="portfolio__item-text portfolio__item-text_link"
          href="https://github.com/DmitriyLvov/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
