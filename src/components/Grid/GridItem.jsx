import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(0, 2),
  },
  form: {
    marginBottom: theme.spacing(1),
  },
}));

function GridItem({ children, className, form, ...rest }) {
  const classes = useStyles();
  const gridItemClasses = cx({
    [classes.grid]: true,
    [classes.form]: form,
    [className]: className !== undefined,
  });

  return (
    <Grid item className={gridItemClasses} {...rest}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  form: PropTypes.bool,
};

export default GridItem;
