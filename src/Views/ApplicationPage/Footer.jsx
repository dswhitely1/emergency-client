import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './footer.styles.scss';

const useStyles = makeStyles((theme) => ({
  block: {},
  left: {
    float: 'left !important',
    display: 'block',
  },
  right: {
    margin: 0,
    fontSize: 14,
    float: 'right !important',
    padding: theme.spacing(2),
  },
  footer: {
    bottom: 0,
    borderTop: '1px solid #e7e7e7',
    padding: theme.spacing(2, 0),
    paddingBottom: theme.spacing(0),
    zIndex: 4,
  },
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
    '@media (min-width: 768px)': {
      width: '750px',
    },
    '@media (min-width: 992px)': {
      width: '970px',
    },
    '@media (min-width: 1200px)': {
      width: '1170px',
    },
  },
  containerFluid: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  list: {
    marginBottom: 0,
    padding: 0,
    marginTop: 0,
  },
  inlineBlock: {
    display: 'inline-block',
    padding: 0,
    width: 'auto',
  },
  whiteColor: {
    '&:&:hover,&:focus': {
      color: theme.palette.common.white,
    },
  },
}));
function Footer({ fluid, white }) {
  const classes = useStyles();
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  const anchorClasses = cx({
    [classes.a]: true,
    [classes.whiteColor]: white,
  });

  const blockClasses = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link component={RouterLink} to="/home" className={blockClasses}>
                Home
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                href="https://facebook.com/Emergency-Electric-246503528745722"
                target="_blank"
                className={blockClasses}
              >
                Facebook
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy;
          {` ${new Date().getFullYear()}, `}
          <Link
            href="https://www.donwhitely.com"
            target="_blank"
            className={anchorClasses}
          >
            Digital Solutions By Don
          </Link>
          , made with love for a better web.
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  white: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
