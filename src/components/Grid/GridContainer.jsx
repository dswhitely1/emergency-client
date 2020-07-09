import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(0, -2),
    width: `calc(100% + ${theme.spacing(4)}px)`,
  },
}));

function GridContainer({ children, className, ...rest }) {
  const classes = useStyles();
  const gridContainerClasses = cx({
    [classes.grid]: true,
    [className]: className !== undefined,
  });

  return (
    <Grid container className={gridContainerClasses} {...rest}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default GridContainer;
