import React, { useContext } from 'react';

import { Button, IconButton } from '@material-ui/core';
import Scrollchor from 'react-scrollchor';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { ActionsContext } from '../../../contexts/ActionsContext';
import {
  ButtonContainer,
  Form,
  FormRows,
  Section,
  StyledContainer,
  StyledTextField,
  StyledTypography,
} from '../styles/customStyles';
import { useForm } from '../../../hooks/useForm';

function Contact() {
  const { isLoading, isSuccess, errors } = useSelector(
    (state) => state.message,
  );
  const actions = useContext(ActionsContext);
  const [values, change, submit, reset] = useForm(
    {
      firstName: '',
      lastName: '',
      contact: '',
      subject: '',
      message: '',
    },
    doSubmit,
  );

  function doSubmit() {
    actions.message.sendMessage(values);
  }

  function handleClose() {
    actions.message.resetSuccess();
    reset();
  }

  return (
    <>
      <Section>
        <StyledContainer maxWidth="lg" description>
          <StyledTypography variant="h3">Contact Us</StyledTypography>
          <StyledTypography variant="h2">Send Us a Message!</StyledTypography>
          <Form onSubmit={submit}>
            <FormRows>
              <StyledTextField
                three
                name="firstName"
                label="First Name"
                onChange={change}
                id="firstName"
                required
                value={values.firstName}
              />
              <StyledTextField
                three
                name="lastName"
                label="Last Name"
                onChange={change}
                id="lastName"
                required
                value={values.lastName}
              />
              <StyledTextField
                three
                name="contact"
                id="contact"
                label="Email or Phone Number"
                onChange={change}
                required
                value={values.contact}
              />
            </FormRows>
            <FormRows>
              <StyledTextField
                name="subject"
                onChange={change}
                id="subject"
                label="Subject"
                required
                value={values.subject}
              />
            </FormRows>
            <FormRows>
              <StyledTextField
                error={Boolean(errors)}
                helperText={
                  errors && 'An error has occurred, please try again later.'
                }
                multiline
                name="message"
                id="message"
                label="Message"
                required
                onChange={change}
                value={values.message}
              />
            </FormRows>
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
          </Form>
        </StyledContainer>
      </Section>
      <ConfirmDialog
        isSuccess={isSuccess}
        title="Send Message"
        message="Your Message has successfully been submitted!"
        handleClose={handleClose}
      />
    </>
  );
}

export default Contact;
