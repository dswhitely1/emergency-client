import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { hexToRgb } from 'utils/utilities';

const colorButton = (color) => ({
  backgroundColor: color,
  boxShadow: `0 2px 2px 0 rgba(${hexToRgb(
    color,
  )}, 0.14), 0 3px 1px -2px rgba(${hexToRgb(
    color,
  )}, 0.2), 0 1px 5px 0 rgba(${hexToRgb(color)}, 0.12)`,
  '&:hover,&:focus': {
    backgroundColor: color,
    boxShadow: `0 14px 26px -12px rgba(${hexToRgb(
      color,
    )}, 0.42), 0 4px 23px 0 rgba(${hexToRgb(
      '#000',
    )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb(color)}, 0.2)`,
  },
});

const simpleColor = (color) => ({
  '&,&:focus,&:hover,&:visited': {
    color,
  },
});

const useStyles = makeStyles((theme) => ({
  button: {
    minHeight: 'auto',
    minWidth: 'auto',
    backgroundColor: '#999',
    color: theme.palette.common.white,
    boxShadow: `0 2px 2px 0 rgba(${hexToRgb(
      '#999',
    )}, 0.14), 0 3px 1px -2px rgba(${hexToRgb(
      '#999',
    )}, 0.2), 0 1px 5px 0 rgba(${hexToRgb('#999')}, 0.12)`,
    border: 'none',
    borderRadius: 3,
    position: 'relative',
    padding: theme.spacing(1.5, 3.75),
    margin: '.3125rem 1px',
    fontSize: 12,
    fontWeight: 400,
    textTransform: 'uppercase',
    willChange: 'box-shadow, transform',
    transition:
      'box-shadow 0.2s cubic-bezier(0.4,0,1,1), background-color 0.2s cubic-bezier(0.4,0,0.2,1)',
    lineHeight: 1.42857143,
    letterSpacing: 0,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    '&:hover,&:focus': {
      color: theme.palette.common.white,
      backgroundColor: '#999',
      boxShadow: `0 14px 26px -12px rgba(${hexToRgb(
        '#999',
      )}, 0.42), 0 4px 23px 0 rgba(${hexToRgb(
        '#999',
      )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb('#999')}, 0.2)`,
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      display: 'inline-block',
      top: 0,
      marginTop: '-1rem',
      marginBottom: '-1rem',
      fontSize: '1.1rem',
      marginRight: 4,
      verticalAlign: 'middle',
    },
    '& svg': {
      position: 'relative',
      display: 'inline-block',
      top: 0,
      width: 18,
      height: 18,
      marginRight: 4,
      verticalAlign: 'middle',
    },
    '&justIcon': {
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        marginTop: 0,
        position: 'absolute',
        width: '100%',
        transform: 'none',
        left: 0,
        top: 0,
        height: '100%',
        lineHeight: '41px',
        fontSize: 20,
      },
    },
  },
  fullWidth: {
    width: '100%',
  },
  secondary: colorButton(theme.palette.secondary.main),
  primary: colorButton(theme.palette.primary.main),
  info: colorButton(theme.palette.info.main),
  success: colorButton(theme.palette.success.main),
  warning: colorButton(theme.palette.warning.main),
  danger: colorButton(theme.palette.error.main),
  white: {
    '&,&:focus,&:hover': {
      backgroundColor: theme.palette.common.white,
      color: '#999',
    },
  },
  twitter: colorButton('#55acee'),
  facebook: colorButton('#3b5998'),
  google: colorButton('#dd4b39'),
  linkedIn: colorButton('#0976b4'),
  pinterest: colorButton('#cc2127'),
  youtube: colorButton('#e52d27'),
  tumblr: colorButton('#35465c'),
  behance: colorButton('#1769ff'),
  dribbble: colorButton('#ea4c89'),
  reddit: colorButton('#ff4500'),
  github: {
    backgroundColor: '#333',
    color: theme.palette.common.white,
    boxShadow: `0 2px 2px 0 rgba(${hexToRgb(
      '#555555',
    )}, 0.14), 0 3px 1px -2px rgba(${hexToRgb(
      '#555555',
    )}, 0.2), 0 1px 5px 0 rgba(${hexToRgb('#555555')}, 0.12)`,
    '&:hover,&:focus,&:visited': {
      backgroundColor: '#333',
      color: theme.palette.common.white,
      boxShadow: `0 14px 26px 12px rgba(${hexToRgb(
        '#555555',
      )}, 0.42), 0 4px 23px 0 rgba(${hexToRgb(
        '#555555',
      )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb('#555555')}, 0.2)`,
    },
  },
  simple: {
    '&,&:focus,&:hover': {
      color: theme.palette.common.white,
      background: 'transparent',
      boxShadow: 'none',
    },
    '&$primary': simpleColor(theme.palette.primary.main),
    '&$secondary': simpleColor(theme.palette.secondary.main),
    '&$success': simpleColor(theme.palette.success.main),
    '&$info': simpleColor(theme.palette.info.main),
    '&$warning': simpleColor(theme.palette.warning.main),
    '&$danger': simpleColor(theme.palette.error.main),
    '&$twitter': simpleColor('#55acee'),
    '&$facebook': simpleColor('#3b5998'),
    '&$google': simpleColor('#dd4b39'),
    '&$linkedIn': simpleColor('#0976b4'),
    '&$pinterest': simpleColor('#cc2127'),
    '&$youtube': simpleColor('#e52d27'),
    '&$tumblr': simpleColor('#35465c'),
    '&$behance': simpleColor('#1769ff'),
    '&$dribbble': simpleColor('#ea4c89'),
    '&$reddit': simpleColor('#ff4500'),
  },
  transparent: {
    '&,&:hover,&:focus': {
      color: 'inherit',
      background: 'transparent',
      boxShadow: 'none',
    },
  },
  disabled: {
    opacity: 0.65,
    pointerEvents: 'none',
  },
  lg: {
    '&$justIcon': {
      '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
        marginTop: -4,
      },
    },
    padding: '1.125rem 2.25rem',
    fontSize: '0.8875rem',
    lineHeight: 1.333333,
    borderRadius: '0.2rem',
  },
  sm: {
    '&$justIcon': {
      '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
        marginTop: 1,
      },
    },
    padding: '0.40625rem 1.25rem',
    fontSize: '0.6875rem',
    lineHeight: 1.5,
    borderRadius: '0.2rem',
  },
  round: {
    borderRadius: 30,
  },
  block: {
    width: '100% !important',
  },
  link: {
    '&,&:hover,&:focus': {
      backgroundColor: 'transparent',
      color: '#999',
      boxShadow: 'none',
    },
  },
  justIcon: {
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 20,
    height: 41,
    minWidth: 41,
    width: 41,
    '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
      marginRight: 0,
    },
    '&$lg': {
      height: 57,
      minWidth: 57,
      width: 57,
      lineHeight: '56px',
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: 32,
        lineHeight: '56px',
      },
      '& svg': {
        width: 32,
        height: 32,
      },
    },
    '&$sm': {
      height: 30,
      minWidth: 30,
      width: 30,
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: 17,
        lineHeight: '29px',
      },
      '& svg': {
        width: 17,
        height: 17,
      },
    },
  },
}));
const RegularButton = forwardRef((props, ref) => {
  const classes = useStyles();
  console.log(classes);
  const {
    children,
    color,
    round,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = cx({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className !== undefined,
  });
  console.log(btnClasses);
  // const btnClasses = cx({
  //   [classes.button]: true,
  //   [classes[size]]: size,
  //   [classes[color]]: color,
  //   [classes.round]: round,
  //   [classes.fullWidth]: fullWidth,
  //   [classes.disabled]: disabled,
  //   [classes.block]: block,
  //   [classes.link]: link,
  //   [classes.justIcon]: justIcon,
  //   [className]: className !== undefined,
  // });

  return (
    <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
});

export default RegularButton;
