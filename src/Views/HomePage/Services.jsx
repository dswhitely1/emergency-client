import React from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Image from 'components/Image/Image';
import Buttons from 'Views/HomePage/Buttons';
import residential from 'assets/erik-mclean-1117932-unsplash.jpg';
import commercial from 'assets/osama-saeed-1433239-unsplash.jpg';

function Services() {
  return (
    <Section inverted id="services">
      <Container>
        <Typography variant="h3" title>
          Services
        </Typography>
        <Typography variant="h2">We Specialize In</Typography>
        <GridContainer>
          <GridItem xs={0} sm />
          <GridItem xs={12} sm={5}>
            <Image src={residential} alt="Residential Services" />
            <Typography variant="h4">Residential</Typography>
            <Typography>
              Emergency Electric, Inc can assist with any type of residential
              renovation, whether you are building an extension to your home or
              installing recessed lights in your condo.
            </Typography>
          </GridItem>
          <GridItem xs={0} sm />
          <GridItem xs={12} sm={5}>
            <Image src={commercial} alt="Commercial Services" />
            <Typography variant="h4">Commercial</Typography>
            <Typography>
              Emergency Electric, Inc offers a variety of commercial services,
              by our commercial electrical contractors.
            </Typography>
          </GridItem>
          <GridItem xs={0} sm />
        </GridContainer>
        <Buttons
          color="secondary"
          desc="What Others Say"
          link="#testimonials"
        />
      </Container>
    </Section>
  );
}

export default Services;
