import React, { useContext } from 'react';
import { StateDataContext } from 'Providers/Redux/StateProvider';
import { ActionsContext } from 'Providers/Redux/ActionsProvider';
import { Button, IconButton, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ButtonContainer from 'components/ButtonContainer/ButtonContainer';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Card from 'components/Card/Card';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Loader from 'react-loader-spinner';
import Scrollchor from 'react-scrollchor';
import { useForm } from '../../hooks/useForm';

function Contact() {
  const {
    message: { isLoading, isSuccess, errors },
  } = useContext(StateDataContext);
  const actions = useContext(ActionsContext);
  const [values, change, submit, reset] = useForm(
    {
      firstName: '',
      lastName: '',
      contact: '',
      subject: '',
      message: '',
    },
    () => {
      actions.message.sendMessage(values);
    },
  );

  function handleClose() {
    actions.message.resetSuccess();
    reset();
  }

  return (
    <>
      <Section>
        <Container description maxWidth="lg">
          <Typography variant="h3" title>
            Contact Us
          </Typography>
          <Typography variant="h2">Send Us A Message!</Typography>
          <form onSubmit={submit}>
            <Card>
              <GridContainer form>
                <GridItem xs={12} md={4} form>
                  <TextField
                    name="firstName"
                    value={values.firstName}
                    onChange={change}
                    id="firstName"
                    label="First Name"
                    required
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} md={4} form>
                  <TextField
                    name="lastName"
                    value={values.lastName}
                    onChange={change}
                    id="lastName"
                    label="Last Name"
                    required
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} md={4} form>
                  <TextField
                    name="contact"
                    value={values.contact}
                    onChange={change}
                    id="contact"
                    label="Email or Phone Number"
                    required
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} form>
                  <TextField
                    name="subject"
                    value={values.subject}
                    onChange={change}
                    id="subject"
                    label="Subject"
                    required
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} form>
                  <TextField
                    error={Boolean(errors)}
                    helperText={
                      errors && 'An error has occurred, please try again later'
                    }
                    multiline
                    rows={4}
                    name="message"
                    value={values.message}
                    onChange={change}
                    id="contact"
                    label="Message"
                    required
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <ButtonContainer form>
                <Button
                  color="primary"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Reset
                </Button>
                <Button color="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader
                      type="ThreeDots"
                      color="#670300"
                      height={20}
                      width={20}
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
                <IconButton
                  aria-label="Scroll To Top"
                  color="primary"
                  component={Scrollchor}
                  to="#root"
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </ButtonContainer>
            </Card>
          </form>
        </Container>
      </Section>
    </>
  );
}

export default Contact;
