import React from 'react';
import {StyledContainer, StyledFooter, StyledTypography} from "../styles/customStyles";
import {Divider, Grid, Typography} from "@material-ui/core";

function Footer() {
    return (
        <StyledFooter inverted>
            <StyledContainer maxWidth='lg'>
                <Grid container>
                    <Grid xs={12} sm={4}>
                        <Typography>Emergency Electric INC</Typography>
                        <Typography>7925 Main St NE</Typography>
                        <Typography>Lanesville, IN 47136</Typography>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Typography>Office: (812) 952-6014</Typography>
                        <Typography>Emergency: (502) 727-4823</Typography>
                        <Divider/>
                        <Typography>Office Hours</Typography>
                        <Typography>Monday - Friday: 8am - 4pm</Typography>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Typography>24 Hour Service</Typography>
                        <Typography>Licensed & Insured</Typography>
                        <Typography>Residential and Commercial</Typography>
                    </Grid>
                </Grid>
                <StyledTypography pargraph spacing>Copyright 2019 - All Rights Reserved</StyledTypography>
            </StyledContainer>

        </StyledFooter>
    )
}

export default Footer;
