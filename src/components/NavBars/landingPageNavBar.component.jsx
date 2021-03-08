import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useLandingPageNavBarStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: 240,
  },
  listItem: {
    '&:hover,&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}));

const landingPageButtons = [
  {
    to: '#about',
    label: 'About',
  },
  {
    to: '#services',
    label: 'Services',
  },
  {
    to: '#testimonials',
    label: 'Testimonials',
  },
  {
    to: '#goals',
    label: 'Goals',
  },
  {
    to: '#contact',
    label: 'Contact',
  },
];

function LandingPageNavBar() {
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
    e.preventDefault();
    const targetScroll = document.getElementById(target);
    scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerClick = () => setIsOpen(!isOpen);
  const classes = useLandingPageNavBarStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Emergency Electric INC
            </Typography>
            <Hidden mdUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClick}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown implementation="css">
              {landingPageButtons.map((button, key) => (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={button.to}
                  key={key}
                  onClick={(e) => smoothScroll(e, button.label.toLowerCase())}
                >
                  {button.label}
                </Button>
              ))}
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        open={isOpen}
        variant="temporary"
        anchor="right"
      >
        <List>
          {landingPageButtons.map((button, key) => (
            <ListItem
              button
              component={RouterLink}
              to={button.to}
              key={key + 100}
              onClick={handleDrawerClick}
              className={classes.listItem}
            >
              <ListItemText
                inset
                primary={button.label}
                onClick={(e) => smoothScroll(e, button.label.toLowerCase())}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default LandingPageNavBar;
