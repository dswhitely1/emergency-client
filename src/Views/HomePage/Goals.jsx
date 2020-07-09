import React from 'react';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Buttons from 'Views/HomePage/Buttons';

function Goals() {
  return (
    <Section inverted id="goals">
      <Container description maxWidth="lg">
        <Typography variant="h2">Our Goals</Typography>
        <Typography>
          We are committed to excellence. Our goal is to exceed your
          expectations. Using our years of experience and expertise and by
          providing a dynamic and skilled team, we will ensure your projects are
          a complete success. Our primary measure of success is customer
          satisfaction. We define customers as employees, partners and clients.
          Our intent is to earn and maintain the respect and trust of everyone
          we come in contact with when representing Emergency Electric Inc.
        </Typography>
        <Buttons color="secondary" desc="Contact Us" link="#contact" />
      </Container>
    </Section>
  );
}

export default Goals;
