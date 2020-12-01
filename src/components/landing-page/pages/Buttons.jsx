import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../styles/customStyles';

function Buttons({ color, link, desc }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scrollGo = (element, to, duration) => {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = function () {
      currentTime += increment;
      element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
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
  const linkTarget = link.split('#')[1];
  return (
    <ButtonContainer>
      <Button
        color={color}
        variant="contained"
        component={RouterLink}
        to={link}
        onClick={(e) => smoothScroll(e, linkTarget)}
      >
        {desc}
      </Button>
      <IconButton
        aria-label="Scroll To Top"
        color={color}
        component={RouterLink}
        onClick={(e) => smoothScroll(e, 'root')}
        to="#root"
      >
        <ArrowUpwardIcon />
      </IconButton>
    </ButtonContainer>
  );
}

Buttons.propTypes = {
  color: PropTypes.string,
  link: PropTypes.string,
  desc: PropTypes.string,
};

export default Buttons;
