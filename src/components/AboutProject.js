import React from 'react';

function AboutProject() {
  return (
    <section className="about">
      <h2 className="underline-header">О проекте</h2>
      <div className="about__content">
        <div>
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="about__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <div className="about__timing">
            <p className="about__timing-element about__timing-element_highlighted">
              1 неделя
            </p>
          </div>
          <p className="about__timing-description about__timing-description_highlighted">
            Back-end
          </p>
        </div>
        <div>
          <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
          <div className="about__timing">
            <p className="about__timing-element">4 недели</p>
          </div>
          <p className="about__timing-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
