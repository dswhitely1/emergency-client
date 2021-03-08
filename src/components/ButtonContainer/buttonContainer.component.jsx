import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useButtonContainerStyles from './buttonContainer.styles';

function ButtonContainer({ children, className, form }) {
  const classes = useButtonContainerStyles();
  const buttonContainerClasses = clsx({
    [classes.root]: true,
    [classes.form]: form,
    [className]: !!className,
  });
  return <div className={buttonContainerClasses}>{children}</div>;
}

ButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  form: PropTypes.bool,
  className: PropTypes.string,
};

export default ButtonContainer;
