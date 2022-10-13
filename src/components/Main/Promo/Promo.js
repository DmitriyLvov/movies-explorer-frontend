import React from 'react';
import logo from '../../../images/landing-logo.png';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <img src={logo} alt="logo" className="promo__logo" />
      <h1 className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;
