import React from 'react';
// import Scrollchor from 'react-scrollchor';
import { Typography } from '@material-ui/core';
import { HomePageLinkContainer } from '../styles/customStyles';

function HomePageLinks() {
  return (
    <>
      <Typography
        variant="body2"
        // component={Scrollchor}
        to="#about"
        color="primary"
      >
        About
      </Typography>
      <Typography
        variant="body2"
        // component={Scrollchor}
        to="#services"
        color="primary"
      >
        Services
      </Typography>
      <Typography
        variant="body2"
        // component={Scrollchor}
        to="#testimonials"
        color="primary"
      >
        Testimonials
      </Typography>
      <Typography
        variant="body2"
        // component={Scrollchor}
        to="#goals"
        color="primary"
      >
        Goals
      </Typography>
      <Typography
        variant="body2"
        // component={Scrollchor}
        to="#contact"
        color="primary"
      >
        Contact
      </Typography>
    </>
  );
}

export default HomePageLinks;
