import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { hexToRgb } from 'utils/utilities';

const useStyles = makeStyles((theme) => ({
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitFlex: 1,
    position: 'relative',
  },
  cardBodyBackground: {
    position: 'relative',
    zIndex: 2,
    minHeight: 280,
    paddingTop: 40,
    paddingBottom: 40,
    maxWidth: 440,
    margin: '0 auto',
  },
  cardBodyPlain: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  cardBodyFormHorizontal: {
    paddingLeft: 15,
    paddingRight: 15,
    '& form': {
      margin: 0,
    },
  },
  cardPricing: {
    padding: 15,
    margin: 0,
  },
  cardSignup: {
    padding: '0 30px',
  },
  cardBodyColor: {
    borderRadius: 6,
    '& h1,& h2,& h3': {
      '& small': {
        color: `rgba(${hexToRgb(theme.palette.common.white)},0.8)`,
      },
    },
  },
  cardBodyProfile: {
    marginTop: 15,
  },
  cardBodyCalendar: {
    padding: 0,
  },
}));

function CardBody({
  children,
  className,
  background,
  calendar,
  color,
  formHorizontal,
  plain,
  pricing,
  profile,
  signup,
  ...rest
}) {
  const classes = useStyles();

  const cardBodyClasses = cx({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyFormHorizontal]: formHorizontal,
    [classes.cardPricing]: pricing,
    [classes.cardSignup]: signup,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodyCalendar]: calendar,
    [className]: className !== undefined,
  });

  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  formHorizontal: PropTypes.bool,
  pricing: PropTypes.bool,
  signup: PropTypes.bool,
  color: PropTypes.bool,
  profile: PropTypes.bool,
  calendar: PropTypes.bool,
};

export default CardBody;
