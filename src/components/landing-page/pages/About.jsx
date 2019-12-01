import React from 'react';
import {Section, StyledContainer, StyledTypography} from "../styles/customStyles";
import Buttons from "./Buttons";

function About() {
    return (
        <Section id='about'>
            <StyledContainer maxWidth='lg' description>
                <StyledTypography variant='h2'>Why Choose Us</StyledTypography>
                <StyledTypography header paragraph>With many years of experience in the electrical industry, we take
                    pride in our professionalism, punctuality, and customer service.</StyledTypography>
                <StyledTypography paragraph>Our primary measure of success is customer satisfaction. We define customers
                    as employees, partners and clients. Our intent is to earn and maintain the respect and trust of
                    everyone we come in contact with when representing Emergency Electric, Inc.</StyledTypography>
                <StyledTypography paragraph>We believe in a personal touch to making ourselves known in the market.
                    Referral and repeat business is important to us. We want every customer to be 100% satisfied with
                    our service and work. We are confident that we meet this goal and that is why we offer a 100%
                    customer satisfaction guarantee.</StyledTypography>
                <Buttons color='primary' desc='What We Offer' link='#services'/>
            </StyledContainer>
        </Section>
    )
}

export default About;
