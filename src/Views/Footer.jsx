import React from 'react';
import AFooter from 'components/Footer/Footer';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Link from 'components/Link/Link';

function Footer() {
  return (
    <AFooter inverted>
      <Container maxWidth="lg">
        <GridContainer>
          <GridItem x={12} sm={4}>
            <Typography footer>Emergency Electric Inc</Typography>
            <Typography footer>7528 E. Pennington St. NE</Typography>
            <Typography>Lanesville, IN 47136</Typography>
          </GridItem>
          <GridItem x={12} sm={4}>
            <Typography footer>Office: (812) 952-6003</Typography>
            <Typography>Emergency: (502) 727-4823</Typography>
            <Typography footer>Office Hours</Typography>
            <Typography>Monday - Friday: 8am - 4pm</Typography>
          </GridItem>
          <GridItem x={12} sm={4}>
            <Typography footer>24 Hour Service</Typography>
            <Typography footer>Licensed & Insured</Typography>
            <Typography>Residential and Commercial</Typography>
          </GridItem>
        </GridContainer>
        <Typography spacing>
          &copy; {new Date().getFullYear()}, All Rights Reserved.
        </Typography>
        <Typography branding>
          Developed By:{' '}
          <Link
            inverted
            href="https://www.donwhitely.com"
            target="_blank"
            rel="noopener norefferer"
          >
            Don Whitely
          </Link>
        </Typography>
      </Container>
    </AFooter>
  );
}

export default Footer;
