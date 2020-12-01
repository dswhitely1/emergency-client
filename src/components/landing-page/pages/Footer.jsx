import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import {
  StyledContainer,
  StyledFooter,
  StyledTypography,
  StyledGrid,
  StyledSpace,
} from '../styles/customStyles';

function Footer() {
  return (
    <StyledFooter inverted>
      <StyledContainer maxWidth="lg">
        <Grid container>
          <StyledGrid xs={12} sm={4}>
            <Typography>Emergency Electric INC</Typography>
            <Typography>7520 E. Pennington St. NE</Typography>
            <Typography>Lanesville, IN 47136</Typography>
          </StyledGrid>
          <StyledGrid xs={12} sm={4}>
            <Typography>Office: (812) 952-6003</Typography>
            <Typography>Emergency: (502) 727-4823</Typography>
            <StyledSpace />
            <Typography>Office Hours</Typography>
            <Typography>Monday - Friday: 8am - 4pm</Typography>
          </StyledGrid>
          <StyledGrid xs={12} sm={4}>
            <Typography>24 Hour Service</Typography>
            <Typography>Licensed & Insured</Typography>
            <Typography>Residential and Commercial</Typography>
          </StyledGrid>
        </Grid>
        <StyledTypography pargraph spacing>
          Copyright 2019 - All Rights Reserved
        </StyledTypography>
      </StyledContainer>
    </StyledFooter>
  );
}

export default Footer;
