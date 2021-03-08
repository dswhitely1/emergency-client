import React from 'react';
import { Typography as T } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useTypographyStyles from './typography.styles';

function Typography({
  children,
  className,
  header,
  spacing,
  noMargin,
  title,
  top,
  align,
  ...rest
}) {
  const classes = useTypographyStyles();
  const typographyClasses = clsx({
    [classes.root]: true,
    [classes.header]: header,
    [classes.spacing]: spacing,
    [classes.noMargin]: noMargin || spacing,
    [classes.title]: title,
    [classes.top]: top,
    [classes[align]]: align,
    [className]: !!className,
  });
  return (
    <T className={typographyClasses} {...rest}>
      {children}
    </T>
  );
}

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.bool,
  spacing: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.bool,
  top: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Typography;
