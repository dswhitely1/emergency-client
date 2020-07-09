import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(0, 2),
  },
}));

function GridItem({ children, className, ...rest }) {
  const classes = useStyles();
  const gridItemClasses = cx({
    [classes.grid]: true,
    [className]: className !== undefined,
  });

  return (
    <Grid item className={gridItemClasses} {...rest}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default GridItem;
