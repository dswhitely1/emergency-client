import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {},
  inverted: {
    color: 'inherit',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'transparent',
    },
  },
}));

function CustomLink({ children, className, inverted, ...rest }) {
  const classes = useStyles();
  const linkClasses = cx({
    [classes.link]: true,
    [classes.inverted]: inverted,
    [className]: className !== undefined,
  });

  return (
    <Link {...rest} className={linkClasses}>
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inverted: PropTypes.bool,
};

export default CustomLink;
