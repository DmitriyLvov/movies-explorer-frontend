import React from 'react';
import photo from '../../images/photo.jpg';
import './aboutMe.css';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="underline-header">Студент</h2>
      <div className="student__content">
        <div>
          <h3 className="student__title">Дмитрий</h3>
          <p className="student__summary">Фронтенд-разработчик, 33 года</p>
          <p className="student__description">
            Я родился и живу в Тольятти, закончил факультет электротехники ТГУ.
            Люблю спорт (в основном бег и велосипед, иногда бассейн), а еще
            увлекаюсь микроконтроллерами на базе Arduino. С 2012 года я работаю
            в компании «Электрощит-Самара». В 2021 перешел на позицию
            разработчика ПО. В 2022 я перешел на проект WEB конфигуратора и
            параллельно поступил на курс WEB разработчика.
          </p>
          <a
            className="student__link"
            href="https://github.com/DmitriyLvov"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="student__photo" src={photo} alt="my face" />
      </div>
    </section>
  );
}

export default AboutMe;
