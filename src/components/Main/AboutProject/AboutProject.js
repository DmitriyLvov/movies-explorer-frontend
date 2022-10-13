import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="underline-header">О проекте</h2>
      <div className="about-project__content">
        <h3 className="about-project__title about-project__title_left">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__description about-project__description_left">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <div className="about-project__timing about-project__timing_left">
          <p className="about-project__timing-element about-project__timing-element_highlighted">
            1 неделя
          </p>
        </div>
        <p className="about-project__timing-description about-project__timing-description_left about-project__timing-description_highlighted">
          Back-end
        </p>
        <h3 className="about-project__title about-project__title_right">
          На выполнение диплома ушло 5 недель
        </h3>
        <div className="about-project__middle-timing" />
        <p className="about-project__description about-project__description_right">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
        <div className="about-project__timing about-project__timing_right">
          <p className="about-project__timing-element">4 недели</p>
        </div>
        <p className="about-project__timing-description about-project__timing-description_right">
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;
