import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Card({ children, className, ...rest }) {
  const classes = useStyles();
  const cardClasses = cx({
    [classes.card]: true,
    [className]: className !== undefined,
  });

  return (
    <Paper className={cardClasses} {...rest}>
      {children}
    </Paper>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
