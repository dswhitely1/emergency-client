import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ButtonContainer from 'components/ButtonContainer/ButtonContainer';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';

function Buttons({ color, link, desc, form }) {
  const displayForm = !!form;
  return (
    <ButtonContainer form={displayForm}>
      <Button color={color} variant="contained">
        <ScrollLink
          to={link.replace(/#/, '')}
          activeClass="active"
          spy
          smooth
          duration={400}
        >
          {desc}
        </ScrollLink>
      </Button>
      <IconButton aria-label="Scroll to top" color={color}>
        <ScrollLink to="root" spy smooth activeClass="active" duration={1000}>
          <ArrowUpwardIcon />
        </ScrollLink>
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
