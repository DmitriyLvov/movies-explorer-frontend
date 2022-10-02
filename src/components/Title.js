import React from 'react';
import logo from '../images/landing-logo.png';

function Title() {
  return (
    <section className="title">
      <img src={logo} alt="logo" className="title__logo" />
      <h1 className="title__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Title;
