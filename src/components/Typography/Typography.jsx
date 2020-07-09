import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    fontWeight: 'bolder',
  },
  spacing: {
    margin: 0,
    paddingTop: theme.spacing(4),
  },
  noMargin: {
    margin: 0,
  },
  title: {
    textTransform: 'uppercase',
    margin: theme.spacing(2, 0),
  },
}));

function CustomTypography({
  header,
  spacing,
  noMargin,
  title,
  children,
  ...rest
}) {
  const classes = useStyles();
  const typographyClasses = cx({
    [classes.root]: true,
    [classes.header]: header,
    [classes.spacing]: spacing,
    [classes.noMargin]: noMargin,
    [classes.title]: title,
  });

  return (
    <Typography className={typographyClasses} {...rest}>
      {children}
    </Typography>
  );
}

CustomTypography.propTypes = {
  header: PropTypes.bool,
  spacing: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default CustomTypography;
