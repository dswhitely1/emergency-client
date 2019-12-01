import React from 'react';
import {Section, StyledContainer, StyledTypography, StyledPaper} from "../styles/customStyles";
import {Grid, Paper} from "@material-ui/core";
import Buttons from "./Buttons";

function Testimonials() {
    return (
        <Section>
            <StyledContainer maxWidth='lg' id='testimonials'>
                <StyledTypography variant='h3'>Testimonials</StyledTypography>
                <StyledTypography variant='h2'>Hear from our customers!</StyledTypography>
                <Grid container>
                    <Grid item xs={0} sm />
                    <Grid item xs={12} sm={5}>
                        <StyledPaper>
                            <StyledTypography paragraph>`They were very efficient, prompt and courteous. They even did a
                                little bit extra that they really did not have to do. They were
                                quick. I have used them twice now`</StyledTypography>
                            <cite>Arlene W.</cite>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={0} sm />
                    <Grid item xs={12} sm={5}>
                        <StyledPaper>
                            <StyledTypography paragraph>`They do very good electrical work. They are friendly,
                                conscientious about their work, arrive on time, charge fair
                                prices and make good recommendations about our electrical
                                service. I liked their personal touch, and helpful, attentive
                                interest. I have used them twice and would use them again`</StyledTypography>
                            <cite>John Robertson</cite>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={0} sm />
                </Grid>
                <Buttons color='primary' desc='Our Goals' link='#goals' />
            </StyledContainer>
        </Section>
    )
}

export default Testimonials;
