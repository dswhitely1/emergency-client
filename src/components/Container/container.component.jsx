import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container as MUIContainer } from '@material-ui/core';
import useContainerStyles from './container.styles';

function Container({ children, className, header, top, description, ...rest }) {
  const classes = useContainerStyles();
  const containerClasses = clsx({
    [classes.container]: true,
    [classes.header]: header,
    [classes.top]: top,
    [classes.description]: description,
    [className]: !!className,
  });

  return (
    <MUIContainer className={containerClasses} {...rest}>
      {children}
    </MUIContainer>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  top: PropTypes.bool,
  header: PropTypes.bool,
  description: PropTypes.bool,
};

export default Container;
