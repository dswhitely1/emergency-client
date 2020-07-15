import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import SideBarLinks from './SideBarLinks';

function SideBarWrapper({ className, ...rest }) {
  return (
    <div className={className}>
      <SideBarLinks {...rest} />
    </div>
  );
}

SideBarWrapper.propTypes = {
  className: PropTypes.string,
  links: PropTypes.object,
};

export default SideBarWrapper;
