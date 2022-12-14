import React from 'react';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';

function Main({ screenWidth }) {
  return (
    <>
      <Header type="main" screenWidth={screenWidth} />
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <div className="main">
        <Footer />
      </div>
    </>
  );
}

export default Main;
