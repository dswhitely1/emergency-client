import React from 'react';
import Header from './pages/Header';
import About from './pages/About';
import Services from './pages/Services';
import Goals from './pages/Goals';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import PhoneNumber from './pages/PhoneNumber';
import HomePageLinks from './pages/HomePageLinks';

function HomePage() {
  return (
    <>
      <PhoneNumber />
      <Header />
      <About />
      <Services />
      <Testimonials />
      <Goals />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
