import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import Scrollchor from 'react-scrollchor';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ButtonContainer from 'components/ButtonContainer/ButtonContainer';
import PropTypes from 'prop-types';

function Buttons({ color, link, desc, form }) {
  const displayForm = !!form;
  return (
    <ButtonContainer form={displayForm}>
      <Button
        color={color}
        variant="contained"
        component={Scrollchor}
        to={link}
      >
        {desc}
      </Button>
      <IconButton
        aria-label="Scroll to top"
        color={color}
        component={Scrollchor}
        to="#root"
      >
        <ArrowUpwardIcon />
      </IconButton>
    </ButtonContainer>
  );
}

Buttons.propTypes = {
  color: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  form: PropTypes.bool,
};

export default Buttons;
