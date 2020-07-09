import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '85vh',
    [theme.breakpoints.up('md')]: {
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
  top: {
    marginTop: theme.spacing(8),
  },
  description: {
    width: '83%',
  },
}));

function CustomContainer({ header, top, description, children, ...rest }) {
  const classes = useStyles();
  const customContainerClasses = cx({
    [classes.container]: true,
    [classes.header]: header,
    [classes.top]: top,
    [classes.description]: description,
  });

  return (
    <Container className={customContainerClasses} {...rest}>
      {children}
    </Container>
  );
}

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
  top: PropTypes.bool,
  description: PropTypes.bool,
};

export default CustomContainer;
