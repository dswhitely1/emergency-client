import React from 'react';
import Header from 'Views/HomePage/Header';
import About from 'Views/HomePage/About';
import Services from 'Views/HomePage/Services';

function LandingPage(props) {
  return (
    <>
      <Header />
      <About />
      <Services />
    </>
  );
}

export default LandingPage;
