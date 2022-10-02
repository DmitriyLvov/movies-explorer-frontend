import React from 'react';
import Title from './Title';
import NavTab from './NavTab';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio';

function Main() {
  return (
    <>
      <Title />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  );
}

export default Main;
