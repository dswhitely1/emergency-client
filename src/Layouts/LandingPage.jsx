import React from 'react';
import Header from 'Views/HomePage/Header';
import About from 'Views/HomePage/About';
import Services from 'Views/HomePage/Services';
import Testimonials from 'Views/HomePage/Testimonials';
import { makeStyles } from '@material-ui/core/styles';
import headerImage from 'assets/electrical-electrician-electricity-1435183.jpg';
import Goals from '../Views/HomePage/Goals';

const useStyles = makeStyles((theme) => ({
  background: {
    background: `linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0, rgba(255,255,255,0.1) 100%), url(${headerImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Header />
      <About />
      <Services />
      <Testimonials />
      <Goals />
    </div>
  );
}

export default LandingPage;
