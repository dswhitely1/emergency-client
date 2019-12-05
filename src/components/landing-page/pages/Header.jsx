import React from 'react';
import {Section, StyledContainer, StyledTypography} from "../styles/customStyles";
import {makeStyles} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import Scrollchor from 'react-scrollchor';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    spacing: {
        marginRight: theme.spacing(2)
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <Section header>
            <StyledContainer maxWidth='lg'>
                <StyledTypography variant='h1' color='primary'>Emergency Electric INC</StyledTypography>
                <StyledTypography variant='h3' color='primary'>24 Hour Service | Licensed and Insured | Residential and Commercial</StyledTypography>
                <Button color='primary' variant="contained" size='large' component={Scrollchor} to='#about' className={classes.spacing}>Find Out More</Button>
                <Button color='primary' variant="contained" size='large' component={RouterLink} to='/login'>Apply Now</Button>
            </StyledContainer>
        </Section>
    )
}

export default Header;
