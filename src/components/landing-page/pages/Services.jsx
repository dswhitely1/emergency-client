import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Image,
  Section,
  StyledContainer,
  StyledTypography,
} from '../styles/customStyles';
import Buttons from './Buttons';
import residential from '../../../assests/erik-mclean-1117932-unsplash.jpg';
import commercial from '../../../assests/osama-saeed-1433239-unsplash.jpg';

function Services() {
  return (
    <Section inverted id="services">
      <StyledContainer>
        <StyledTypography variant="h3">Services</StyledTypography>
        <StyledTypography variant="h2">We Specialize In</StyledTypography>
        <Grid container>
          <Grid item xs={0} sm />
          <Grid item xs={12} sm={5}>
            <Image src={residential} alt="Residential" />
            <StyledTypography variant="h4">Residential</StyledTypography>
            <StyledTypography paragraph>
              Emergency Electric, Inc can assist with any type of residential
              renovation, whether you are building an extension to your home or
              installing recessed lights in your condo.
            </StyledTypography>
          </Grid>
          <Grid item xs={0} sm />
          <Grid item xs={12} sm={5}>
            <Image src={commercial} alt="Residential" />
            <StyledTypography variant="h4">Commercial</StyledTypography>
            <StyledTypography paragraph>
              Emergency Electric, Inc offers a variety of commercial services,
              by our commercial electrical contractors.
            </StyledTypography>
          </Grid>
          <Grid item xs={0} sm />
        </Grid>
        <Buttons
          color="secondary"
          desc="What Others Say"
          link="#testimonials"
        />
      </StyledContainer>
    </Section>
  );
}

export default Services;
