import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hexToRgb } from '../../utils/utilities';

const useStyles = makeStyles((theme) => ({
  card: {
    border: 0,
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 4,
    color: `rgba(${hexToRgb(theme.palette.common.black)}, 0.87)`,
    background: theme.palette.common.white,
    boxShadow: `0 1px 4px 0 rgba(${hexToRgb(
      theme.palette.common.black,
    )}, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    wordWrap: 'break-word',
  },
}));

function Card({ children, className, ...rest }) {
  const classes = useStyles();

  const cardClasses = cx({
    [classes.card]: true,
    [className]: className !== undefined,
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
