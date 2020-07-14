import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';

let ps;
function SideBarWrapper({ className, links }) {
  const sideBarWrapper = createRef();
  const [isWin] = useState(() => navigator.platform.indexOf('Win') > -1);

  useEffect(() => {
    if (isWin) {
      ps = new PerfectScrollbar(sideBarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return () => {
      if (isWin) {
        ps.destroy();
      }
    };
  });

  return (
    <div className={className} ref={sideBarWrapper}>
      {links}
    </div>
  );
}

SideBarWrapper.propTypes = {
  className: PropTypes.string,
  links: PropTypes.object,
};

export default SideBarWrapper;
