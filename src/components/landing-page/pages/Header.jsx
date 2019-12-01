import React from 'react';
import {Section, StyledContainer, StyledTypography} from "../styles/customStyles";
import {Button} from "@material-ui/core";
import Scrollchor from 'react-scrollchor';
import {Link as RouterLink} from 'react-router-dom';

function Header() {
    return (
        <Section header>
            <StyledContainer maxWidth='lg'>
                <StyledTypography variant='h1' color='primary'>Emergency Electric INC</StyledTypography>
                <StyledTypography variant='h3' color='primary'>24 Hour Service | Licensed and Insured | Residential and Commercial</StyledTypography>
                <Button color='primary' size='large' component={Scrollchor} to='#about'>Find Out More</Button>
                <Button color='primary' size='large' component={RouterLink} to='/login'>Apply Now</Button>
            </StyledContainer>
        </Section>
    )
}

export default Header;
