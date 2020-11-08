import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hexToRgb } from '../../utils/utilities';

const cardColor = (color, whiteColor) => ({
  background: `linear-gradient(60deg,${color[1]},${color[4]})`,
  '& h1 small': {
    color: `rgba(${hexToRgb(whiteColor)},0.8)`,
  },
  color: whiteColor,
});

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
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardProfile: {
    marginTop: 30,
    textAlign: 'center',
  },
  cardBlog: {
    marginTop: 60,
  },
  cardRaised: {
    boxShadow: `0 16px 38px -12px rgba(${hexToRgb(
      theme.palette.common.black,
    )}, 0.56), 0 4px 25px 0 rgba(${hexToRgb(
      theme.palette.common.black,
    )},0.12), 0 8px 10px -5px rgba(${hexToRgb(
      theme.palette.common.black,
    )},0.2)`,
  },
  cardBackground: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    textAlign: 'center',
    '&:after': {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      content: '""',
      backgroundColor: `rgba(${hexToRgb(theme.palette.common.black)},0.56)`,
      borderRadius: 6,
    },
    '& small': {
      color: `rgba(${hexToRgb(theme.palette.common.white)},0.7) !important`,
    },
  },
  cardPricing: {
    textAlign: 'center',
    '&:after': {
      backgroundColor: `rgba(${hexToRgb(
        theme.palette.common.black,
      )},0.7) !important`,
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      maxWidth: 240,
      margin: '10px auto',
      '& li': {
        color: theme.customTheme.palette.gray[0],
        textAlign: 'center',
        padding: '12px 0',
        borderBottom: `1px solid rgba(${hexToRgb(
          theme.customTheme.palette.gray[0],
        )},0.3)`,
        '&:last-child': {
          border: 0,
        },
        '& b': {
          color: theme.customTheme.palette.gray[2],
        },
        '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
          position: 'relative',
          top: 7,
        },
      },
    },
    '& h1': {
      marginTop: 30,
      '& small': {
        display: 'inline-flex',
        height: 0,
        fontSize: 18,
        '&:first-child': {
          position: 'relative',
          top: -17,
          fontSize: 26,
        },
      },
    },
  },
  cardPricingColor: {
    '& ul li': {
      color: theme.palette.common.white,
      borderColor: `rgba(${hexToRgb(theme.palette.common.white)},0.3)`,
      '& b,& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
        color: theme.palette.common.white,
        fontWeight: 700,
      },
    },
  },
  cardProduct: {
    marginTop: 30,
  },
  primary: cardColor(
    theme.customTheme.palette.primary,
    theme.palette.common.white,
  ),
  info: cardColor(theme.customTheme.palette.info, theme.palette.common.white),
  success: cardColor(
    theme.customTheme.palette.success,
    theme.palette.common.white,
  ),
  warning: cardColor(
    theme.customTheme.palette.warning,
    theme.palette.common.white,
  ),
  danger: cardColor(
    theme.customTheme.palette.danger,
    theme.palette.common.white,
  ),
  secondary: cardColor(
    theme.customTheme.palette.secondary,
    theme.palette.common.white,
  ),
  cardChart: {
    '& p': {
      marginTop: 0,
      paddingTop: 0,
    },
  },
  cardLogin: {
    transform: `translate3d(${hexToRgb(theme.palette.common.black)})`,
    transition: 'all 300ms linear',
  },
}));

function Card({
  children,
  className,
  background,
  blog,
  chart,
  color,
  login,
  plain,
  pricing,
  product,
  profile,
  raised,
  testimonial,
  ...rest
}) {
  const classes = useStyles();

  const cardClasses = cx({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [className]: className !== undefined,
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'secondary',
  ]),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
