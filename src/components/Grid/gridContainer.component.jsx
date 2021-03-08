import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useGridContainerStyles = makeStyles((theme) => ({
  grid: {
    width: 'calc(100% + 32px)',
    margin: theme.spacing(0, -2),
  },
}));

function GridContainer({ children, className, ...rest }) {
  const classes = useGridContainerStyles();
  const gridContainerClasses = clsx({
    [classes.grid]: true,
    [className]: !!className,
  });

  return (
    <Grid container {...rest} className={gridContainerClasses}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default GridContainer;
