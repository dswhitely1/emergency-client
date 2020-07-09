import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';

function Header(props) {
  return (
    <Section header>
      <Container header>
        <Typography variant="h2" component="h1" color="primary">
          Emergency Electric Inc
        </Typography>
        <Typography variant="h5" component="h3" color="primary">
          24 Hour Service | Licensed and Insured | Residential and Commercial
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/login"
        >
          Apply Now
        </Button>
      </Container>
    </Section>
  );
}

export default Header;