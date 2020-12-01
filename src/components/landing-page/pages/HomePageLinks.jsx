import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';

function HomePageLinks() {
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
  return (
    <>
      <Typography
        variant="body2"
        component={RouterLink}
        to="#about"
        color="primary"
        onClick={(e) => smoothScroll(e, 'about')}
      >
        About
      </Typography>
      <Typography
        variant="body2"
        component={RouterLink}
        to="#services"
        color="primary"
        onClick={(e) => smoothScroll(e, 'services')}
      >
        Services
      </Typography>
      <Typography
        variant="body2"
        component={RouterLink}
        to="#testimonials"
        color="primary"
        onClick={(e) => smoothScroll(e, 'testimonials')}
      >
        Testimonials
      </Typography>
      <Typography
        variant="body2"
        component={RouterLink}
        to="#goals"
        color="primary"
        onClick={(e) => smoothScroll(e, 'goals')}
      >
        Goals
      </Typography>
      <Typography
        variant="body2"
        component={RouterLink}
        to="#contact"
        color="primary"
        onClick={(e) => smoothScroll(e, 'contact')}
      >
        Contact
      </Typography>
    </>
  );
}

export default HomePageLinks;
