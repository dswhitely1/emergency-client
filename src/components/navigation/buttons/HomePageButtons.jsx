import React from 'react';
import { Button } from '@material-ui/core';
// import Scrollchor from 'react-scrollchor';
import { Link as RouterLink } from 'react-router-dom';
import { DesktopOnlyView } from '../../landing-page/styles/customStyles';

function HomepageButtons() {
  return (
    <>
      <DesktopOnlyView>
        <Button color="inherit" to="#about">
          About
        </Button>
        <Button color="inherit" to="#services">
          Services
        </Button>
        <Button color="inherit" to="#testimonials">
          Testimonials
        </Button>
        <Button color="inherit" to="#goals">
          Goals
        </Button>
        <Button color="inherit" to="#contact">
          Contact
        </Button>
      </DesktopOnlyView>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
    </>
  );
}

export default HomepageButtons;
