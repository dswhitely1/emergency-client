import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import headerImage from 'assets/electrical-electrician-electricity-1435183.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 0),
    backgroundColor: 'inherit',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(6, 6),
    opacity: 0.9,
    transition: 'opacity 500ms ease-out',
    '&:hover,&:focus': {
      opacity: 1,
      transition: 'opacity 500ms ease-in',
    },
    [theme.breakpoints.down('sm')]: {
      opacity: 1,
      margin: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  invertedNot: {
    backgroundColor: '#f9f7f5',
  },
  inverted: {
    backgroundColor: '#351a1a',
    color: '#b48a66',
  },
  header: {
    padding: 0,
    minHeight: theme.spacing(38),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    height: 'auto',
    opacity: 1,
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
    [theme.breakpoints.down('sm')]: {
      background: `linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0, rgba(255,255,255,0.1) 100%), url(${headerImage})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  },
}));

function Section({ inverted, header, children, className, ...rest }) {
  const classes = useStyles();
  const sectionClasses = cx({
    [classes.root]: true,
    [classes.inverted]: inverted,
    [classes.header]: header,
    [classes.invertedNot]: !inverted && !header,
    [className]: className !== undefined,
  });

  return (
    <section className={sectionClasses} {...rest}>
      {children}
    </section>
  );
}

Section.propTypes = {
  inverted: PropTypes.bool,
  header: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Section;
