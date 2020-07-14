import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import cx from 'classnames';

function SideBarBrand({ logoText, logo, classes, miniActive }) {
  const logoClasses = cx({
    [classes.logo]: true,
  });
  const logoNormal = cx({
    [classes.logoNormal]: true,
    [classes.logoNormalSidebarMini]: miniActive,
  });
  return (
    <div className={logoClasses}>
      <Link component={RouterLink} to="/home" className={classes.logoMini}>
        <img src={logo} alt="logo" className={classes.img} />
      </Link>
      <Link component={RouterLink} to="/home" className={logoNormal}>
        {logoText}
      </Link>
    </div>
  );
}

SideBarBrand.defaultProps = {
  logoText: 'Emergency Electric Inc',
};

SideBarBrand.propTypes = {
  classes: PropTypes.shape({
    logo: PropTypes.string,
    whiteAfter: PropTypes.string,
    logoNormal: PropTypes.string,
    logoNormalSidebarMini: PropTypes.string,
    logoMini: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  logo: PropTypes.string.isRequired,
  logoText: PropTypes.string,
  miniActive: PropTypes.bool.isRequired,
};

export default SideBarBrand;
