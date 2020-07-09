import React from 'react';
import Section from 'components/Section/Section';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Card from 'components/Card/Card';
import Buttons from 'Views/HomePage/Buttons';

function Testimonials() {
  return (
    <Section>
      <Container maxWidth="lg" id="testimonials">
        <Typography variant="h3" title>
          Testimonials
        </Typography>
        <Typography variant="h2">Hear from our Customers</Typography>
        <GridContainer>
          <GridItem sm />
          <GridItem xs={12} sm={5}>
            <Card>
              <Typography>
                `They were very efficient, prompt and courteous. They even did a
                little bit extra that they really did not have to do. They were
                quick. I have used them twice now`
              </Typography>
              <cite>Arlene W.</cite>
            </Card>
          </GridItem>
          <GridItem sm />
          <GridItem xs={12} sm={5}>
            <Card>
              <Typography>
                `They do very good electrical work. They are friendly,
                conscientious about their work, arrive on time, charge fair
                prices and make good recommendations about our electrical
                service. I liked their personal touch, and helpful, attentive
                interest. I have used them twice and would use them again`
              </Typography>
              <cite>John Robertson</cite>
            </Card>
          </GridItem>
          <GridItem sm />
        </GridContainer>
        <Buttons color="primary" desc="Our Goals" link="#goals" />
      </Container>
    </Section>
  );
}

export default Testimonials;
