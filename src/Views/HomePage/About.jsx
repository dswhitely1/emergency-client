import React from 'react';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Buttons from 'Views/HomePage/Buttons';

function About() {
  return (
    <Section id="about">
      <Container description maxWidth="lg">
        <Typography variant="h2">Why Choose Us</Typography>
        <Typography header>
          With many years of experience in the electrical industry, we take
          pride in our professionalism, punctuality, and customer service.
        </Typography>
        <Typography>
          Our primary measure of success is customer satisfaction. We define
          customers as employees, partners and clients. Our intent is to earn
          and maintain the respect and trust of everyone we come in contact with
          when representing Emergency Electric, Inc.
        </Typography>
        <Typography>
          We believe in a personal touch to making ourselves known in the
          market. Referral and repeat business is important to us. We want every
          customer to be 100% satisfied with our service and work. We are
          confident that we meet this goal and that is why we offer a 100%
          customer satisfaction guarantee.
        </Typography>
        <Buttons desc="What We Offer" color="primary" link="#services" />
      </Container>
    </Section>
  );
}

export default About;
