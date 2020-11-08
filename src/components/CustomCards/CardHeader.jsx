import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { hexToRgb } from 'utils/utilities';

const colorCardHeader = (color, blackColor, themeColor) => ({
  background: `linear-gradient(60deg,${color[0]},${color[1]})`,
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(
    blackColor,
  )},.14), 0 7px 10px -5px rgba(${hexToRgb(themeColor)},.4)`,
});

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: 0,
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&$cardHeaderPlain,&$cardHeaderImage,&$cardHeaderContact,&$cardHeaderSignup,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$secondaryCardHeader': {
      margin: '0 15px',
      padding: 0,
      position: 'relative',
      color: theme.palette.common.white,
    },
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
    },
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$secondaryCardHeader': {
      '&:not($cardHeaderIcon):not($cardHeaderImage):not($cardHeaderText)': {
        borderRadius: 3,
        marginTop: -20,
        padding: 15,
      },
    },
    '&$cardHeaderStats svg': {
      fontSize: 36,
      lineHeight: '56px',
      textAlign: 'center',
      width: 36,
      height: 36,
      margin: '10px 10px 4px',
    },
    '&$cardHeaderStats .fab,&$cardHeaderStats .fas,&$cardHeaderStats .far,&$cardHeaderStats .fal,&$cardHeaderStats .material-icons': {
      fontsize: 36,
      lineHeight: '56px',
      width: 56,
      height: 56,
      textAlign: 'center',
      overflow: 'unset',
      marginBottom: 1,
    },
    '&$cardHeaderStats$cardHeaderIcon': {
      textAlign: 'right',
    },
    '&$cardHeaderImage': {
      marginLeft: 15,
      marginRight: 15,
      marginTop: -30,
      borderRadius: 6,
    },
    '&$cardHeaderText': {
      display: 'inline-block',
    },
  },
  cardHeaderPlain: {
    marginLeft: 0,
    marginRight: 0,
    '&$cardHeaderText': {
      margin: '0 !important',
    },
  },
  cardHeaderImage: {
    position: 'relative',
    padding: 0,
    zIndex: 1,
    '& img': {
      width: '100%',
      borderRadius: 6,
      pointerEvents: 'none',
      boxShadow: `0 5px 15px -8px rgba(${hexToRgb(
        theme.palette.common.black,
      )},0.24), 0 8px 10px -5px rgba(${hexToRgb(
        theme.palette.common.black,
      )},0.2)`,
    },
    '& a': {
      display: 'block',
    },
  },
  cardHeaderContact: {
    margin: '0 15px',
    marginTop: -20,
  },
  cardHeaderSignup: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: -40,
    padding: '20px 0',
    width: '100%',
    marginBottom: 15,
  },
  cardHeaderStats: {
    '& $cardHeaderIcon': {
      textAlign: 'right',
    },
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      margin: '0 !important',
    },
  },
  cardHeaderIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$secondaryCardHeader': {
      background: 'transparent',
      boxShadow: 'none',
    },
    '& .fab,& .fas, & .far,& .fal,& .material-icons': {
      width: 33,
      height: 33,
      textAlign: 'center',
      lineHeight: '33px',
    },
    '& svg': {
      width: 24,
      height: 24,
      textAlign: 'center',
      lineHeight: '33px',
      margin: '5px 4px 0',
    },
  },
  cardHeaderText: {},
  warningCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        ['#ffa726', '#fb8c00'],
        theme.palette.common.black,
        '#ff9800',
      ),
    },
  },
  successCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        ['#ffa726', '#fb8c00'],
        theme.palette.common.black,
        '#ff9800',
      ),
    },
  },
  dangerCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        ['#ffa726', '#fb8c00'],
        theme.palette.common.black,
        '#ff9800',
      ),
    },
  },
  infoCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        ['#ffa726', '#fb8c00'],
        theme.palette.common.black,
        '#ff9800',
      ),
    },
  },
  primaryCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        [theme.palette.primary.dark, theme.palette.primary.light],
        theme.palette.common.black,
        theme.palette.primary.main,
      ),
    },
  },
  secondaryCardHeader: {
    color: theme.palette.common.white,
    '&:not($cardHeaderText):not($cardHeaderIcon)': {
      ...colorCardHeader(
        [theme.palette.secondary.dark, theme.palette.secondary.light],
        theme.palette.common.black,
        theme.palette.secondary.main,
      ),
    },
  },
}));

function CardHeader({
  className,
  children,
  color,
  contact,
  icon,
  image,
  plain,
  signup,
  stats,
  text,
  ...rest
}) {
  const classes = useStyles();
  const cardHeaderClasses = cx({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderText]: text,
    [className]: className !== undefined,
  });
  return (
    <div {...rest} className={cardHeaderClasses}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'secondary',
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  text: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default CardHeader;
