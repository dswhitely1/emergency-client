import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  footer: {},
  inverted: {
    padding: theme.spacing(4, 0, 0),
    backgroundColor: '#222222',
    color: '#b48a66',
  },
}));

function Footer({ children, className, inverted, ...rest }) {
  const classes = useStyles();
  const footerClasses = cx({
    [classes.footer]: true,
    [classes.inverted]: inverted,
    [className]: className !== undefined,
  });

  return (
    <footer className={footerClasses} {...rest}>
      {children}
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inverted: PropTypes.bool,
};

export default Footer;
