import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import headerImage from 'assets/electrical-electrician-electricity-1435183.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 0),
    borderRadius: theme.spacing(5),
    border: '1px solid #ddd',
    backgroundColor: 'inherit',
    margin: theme.spacing(6, 0),
    opacity: 0.8,
    '&:hover,&:focus': {
      opacity: 1,
    },
  },
  invertedNot: {
    backgroundColor: '#f9f7f5',
    opacity: 0.8,
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
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      height: '100vh',
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
