import React, { useContext } from 'react';

import { Button, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { Link as RouterLink } from 'react-router-dom';
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
    (state) => state.message
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
    () => actions.message.sendMessage(values)
  );

  function handleClose() {
    actions.message.resetSuccess();
    reset();
  }

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scrollGo = (element, to, duration) => {
    const start = element.scrollTop;
    const changed = to - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = function () {
      currentTime += increment;
      element.scrollTop = easeInOutQuad(currentTime, start, changed, duration);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  const smoothScroll = (e, target) => {
    const isMobile = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
    if (isMobile) {
      // Scroll Managed by the Browser
    } else {
      e.preventDefault();
      const targetScroll = document.getElementById(target);
      scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
    }
  };

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
                  <ThreeDots
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
                component={RouterLink}
                onClick={(e) => smoothScroll(e, 'root')}
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
