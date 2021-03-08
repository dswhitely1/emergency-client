import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useGridItemStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(0, 2),
  },
  spacing: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

function GridItem({ children, className, spacing, ...rest }) {
  const classes = useGridItemStyles();
  const gridItemClasses = clsx({
    [classes.grid]: true,
    [classes.spacing]: spacing,
    [className]: !!className,
  });

  return (
    <Grid item {...rest} className={gridItemClasses}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  spacing: PropTypes.bool,
};

export default GridItem;
