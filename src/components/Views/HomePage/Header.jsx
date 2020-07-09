import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { StyledTypography } from '../../landing-page/styles/customStyles';

function Header(props) {
  return (
    <section>
      <Typography variant="h1" color="primary">
        Emergency Electric Inc
      </Typography>
      <Typography variant="h4" color="primary">
        24 Hour Service | Licensed and Insured | Residential and Commercial
      </Typography>
    </section>
  );
}

export default Header;
