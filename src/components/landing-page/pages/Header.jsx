import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  HomePageLinkContainer,
  MobileOnlyView,
  Section,
  StyledContainer,
  StyledTypography,
} from '../styles/customStyles';
import HomePageLinks from './HomePageLinks';

function Header() {
  return (
    <Section header>
      <StyledContainer maxWidth="lg" header>
        <HomePageLinkContainer>
          <HomePageLinks />
        </HomePageLinkContainer>
        <div>
          <StyledTypography variant="h1" color="primary">
            Emergency Electric INC
          </StyledTypography>
          <StyledTypography variant="h4" color="primary">
            24 Hour Service | Licensed and Insured | Residential and Commercial
          </StyledTypography>

          <Button
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/login"
          >
            Apply Now
          </Button>
        </div>
        <MobileOnlyView>
          <StyledTypography variant="body2" color="primary">
            Emergency Electric INC is an Equal Opportunity Employer
          </StyledTypography>
        </MobileOnlyView>
      </StyledContainer>
    </Section>
  );
}

export default Header;
