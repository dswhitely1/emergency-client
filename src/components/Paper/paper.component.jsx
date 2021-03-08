import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper as P } from '@material-ui/core';

const usePaperStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

function Paper({ className, children, ...rest }) {
  const classes = usePaperStyles();
  const paperClasses = clsx({
    [classes.root]: true,
    [className]: !!className,
  });
  return (
    <P className={paperClasses} {...rest}>
      {children}
    </P>
  );
}

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Paper;
