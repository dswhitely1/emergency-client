import React, { useState, useEffect, createRef } from 'react';
import Header from 'Views/HomePage/Header';
import About from 'Views/HomePage/About';
import Services from 'Views/HomePage/Services';
import Testimonials from 'Views/HomePage/Testimonials';
import { makeStyles } from '@material-ui/core/styles';
import headerImage from 'assets/electrical-electrician-electricity-1435183.jpg';
import Contact from 'Views/HomePage/Contact';
import PerfectScrollbar from 'perfect-scrollbar';
import Goals from '../Views/HomePage/Goals';
import LandingPageNavBar from '../components/NavBars/LandingPageNavBar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import Footer from '../Views/HomePage/Footer';

let ps;

const useStyles = makeStyles((theme) => ({
  background: {
    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0, rgba(255,255,255,0.1) 100%), url(${headerImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(100% - 192px)',
    [theme.breakpoints.down('sm')]: {
      background: 'none',
    },
  },
}));

function LandingPage(props) {
  const classes = useStyles();

  return (
    <>
      <LandingPageNavBar />
      <div className={classes.background}>
        <Header />
        <About />
        <Services />
        <Testimonials />
        <Goals />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
