import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitFlex: 1,
    position: 'relative',
  },
}));

function CardBody({ children, className, ...rest }) {
  const classes = useStyles();

  const cardBodyClasses = cx({
    [classes.cardBody]: true,
    [className]: className !== undefined,
  });

  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardBody;
