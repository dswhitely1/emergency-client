import React, { createRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Drawer, Hidden } from '@material-ui/core';
import EELogo from 'assets/eeSmall.png';
import SideBarBrand from './SideBarBrand';
import SideBarWrapper from './SideBarWrapper';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1032,
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: 260,
    borderRadius: 3,
    boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0 rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    [theme.breakpoints.up('md')]: {
      width: 260,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: 260,
      borderRadius: 3,
      boxShadow: `0 10px 20px -12px rgba(0,0,0, 0.42), 0 3px 20px 0 rgba(0,0,0, 0.12), 0 8px 10px -5px rgba(0,0,0, 0.2)`,
      padding: '10px 0',
      position: 'fixed',
      display: 'block',
      top: 0,
      height: '100vh',
      right: 0,
      left: 'auto',
      zIndex: 1032,
      visibility: 'visibile',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: 0,
      paddingLeft: 0,
      transform: 'translate3d(260px, 0, 0)',
      transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: 3,
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: 0,
    },
  },
  blackBackground: {
    color: theme.palette.common.white,
    '&:after': {
      background: theme.palette.common.black,
      opacity: 0.8,
    },
  },
  drawerPaperMini: {
    width: `80px !important`,
  },
  logo: {
    padding: theme.spacing(2, 0),
    margin: 0,
    display: 'block',
    position: 'relative',
    zIndex: 4,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      height: 1,
      right: 15,
      width: 'calc(100% - 30px)',
      backgroundColor: 'hsla(0,0%,100%,.3)',
    },
  },
  logoMini: {
    transition: 'all 300ms linear',
    opacity: 1,
    float: 'left',
    textAlign: 'center',
    width: 30,
    display: 'inline-block',
    maxHeight: 30,
    marginLeft: 22,
    marginRight: 18,
    marginTop: 7,
    color: 'inherit',
  },
  logoNormal: {
    transition: 'all 300ms linear',
    display: 'block',
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 0),
    lineHeight: 2.25,
    overflow: 'hidden',
    '&,&:hover,&:focus': {
      color: 'inherit',
    },
  },
  logoNormalSidebarMini: {
    opacity: 0,
    transform: 'translate3d(-25px, 0, 0)',
  },
  img: {
    width: 32,
    verticalAlign: 'middle',
    border: 0,
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    display: 'block',
    top: 0,
    left: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'cover cover',
    transition: 'all 300ms linear',
  },
  list: {
    marginTop: 15,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    marginBottom: 0,
    listStyle: 'none',
    color: 'inherit',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
  item: {
    color: 'inherit',
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: 0,
    padding: 0,
  },
  userItem: {
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  itemLink: {
    paddingLeft: 10,
    paddingRight: 10,
    transition: 'all 300ms linear',
    margin: '10px 15px 0',
    borderRadius: 3,
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    width: 'auto',
    '&:hover': {
      outline: 'none',
      backgroundColor: `rgba(${theme.palette.common.black}, 0.2)`,
      boxShadow: 'none',
    },
    '&,&:hover,&:focus': {
      color: 'inherit',
    },
  },
  itemIcon: {
    color: 'inherit',
    width: 30,
    height: 24,
    float: 'left',
    position: 'inherit',
    top: 3,
    marginRight: 15,
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: 0.8,
  },
  itemText: {
    color: 'inherit',
    margin: 0,
    lineHeight: '30px',
    fontSize: 14,
    transform: 'translate3d(0px,0,0)',
    opacity: 1,
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    position: 'relative',
    display: 'block',
    height: 'auto',
    whiteSpace: 'nowrap',
    padding: '0 16px !important',
  },
  userItemText: {
    lineHeight: '22px',
  },
  itemTextMini: {
    transform: 'translate3d(-25px,0 0) !important',
    opacity: 0,
  },
  collapseList: {
    marginTop: 0,
    '& $caret': {
      marginTop: 8,
    },
  },
  collapseItem: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: '10px 0 0 0',
    padding: 0,
  },
  collapseActive: {
    outline: 'none',
    backgroundColor: `rgba(0,0,0, 0.2)`,
    boxShadow: 'none',
  },
  collapseItemLink: {
    transition: 'all 300ms linear',
    margin: '0 15px',
    borderRadius: 3,
    position: 'relative',
    display: 'block',
    padding: 10,
    backgroundColor: 'transparent',
    width: 'auto',
    '&:hover': {
      outline: 'none',
      backgroundColor: `rgba(0,0,0, 0.2)`,
      boxShadow: 'none',
    },
    '&,&:hover,&:focus': {
      color: 'inherit',
    },
  },
  collapseItemMini: {
    color: 'inherit',
    textTransform: 'uppercase',
    width: 30,
    marginRight: 15,
    textAlign: 'center',
    letterSpacing: '1px',
    position: 'relative',
    float: 'left',
    display: 'inherit',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    fontSize: 14,
  },
  collapseItemText: {
    color: 'inherit',
    margin: 0,
    position: 'relative',
    transform: 'translateX(0px)',
    opacity: 1,
    whiteSpace: 'nowrap',
    display: 'block',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
  },
  collapseItemTextLinkView: {
    lineHeight: '30px',
  },
  collapseItemTextMini: {
    transform: 'translate3d(-25px,0,0)',
    opacity: 0,
  },
  caret: {
    marginTop: 13,
    position: 'absolute',
    right: 18,
    transition: 'all 150ms ease-in',
    display: 'inline-block',
    width: 0,
    height: 0,
    marginLeft: 2,
    verticalAlign: 'middle',
    borderTop: '4px solid',
    borderRight: '4px solid transparent',
    borderLeft: '4px solid transparent',
  },
  userCaret: {
    marginTop: 10,
  },
  caretActive: {
    transform: 'rotate(180deg)',
  },
  primary: {
    '&,&:hover,&:focus': {
      color: theme.palette.common.white,
      backgroundColor: '#222222',
      boxShadow: `0 4px 20px 0 rgba(0,0,0, 0.14), 0 7px 10px -5px rgba(0,0,0, 0.4)`,
    },
  },
  sideBarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: 260,
    zIndex: 4,
    overflowScrolling: 'touch',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    color: 'inherit',
    paddingBottom: 30,
  },
  sidebarWrapperWithPerfectScrollbar: {
    overflow: 'hidden !important',
  },
}));

function SideBar({
  bgColor,
  handleDrawerToggle,
  miniActive,
  mobileOpen,
  location,
  routes,
  ...rest
}) {
  const sideBar = createRef();
  const classes = useStyles();
  const getCollapseInitialState = (checkRoutes) => {
    if (checkRoutes) {
      for (const route of checkRoutes) {
        const { collapse, views, path } = route;
        if (collapse && getCollapseInitialState(views)) {
          return true;
        }
        if (window.location.href.indexOf(path) !== -1) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const getCollapseStates = (checkRoutes) => {
    let initialState = {};
    for (const route of checkRoutes) {
      const { collapse, state, views } = route;
      if (collapse) {
        initialState = {
          [state]: getCollapseInitialState(views),
          ...getCollapseStates(views),
          ...initialState,
        };
      }
    }
    return initialState;
  };

  const activeRoute = (routeName) => location.pathname === routeName;

  const [collapseState, setCollapseState] = useState(() =>
    getCollapseStates(routes),
  );

  const openCollapse = (collapse) =>
    setCollapseState({
      ...collapseState,
      [collapse]: !collapseState[collapse],
    });

  const drawerPaperClasses = cx({
    [classes.drawerPaper]: true,
    [classes.drawerPaperMini]: miniActive,
    [classes.primary]: true,
  });

  const sideBarWrapperClasses = cx({
    [classes.sideBarWrapper]: true,
    [classes.drawerPaperMini]: miniActive,
  });

  return (
    <div ref={sideBar}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{ paper: drawerPaperClasses }}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <SideBarBrand
            logo={EELogo}
            logoText="Emergency Electric Inc"
            classes={classes}
            miniActive
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{ paper: drawerPaperClasses }}
        >
          <SideBarBrand
            classes={classes}
            logo={EELogo}
            miniActive={miniActive}
          />
          <SideBarWrapper className={sideBarWrapperClasses} />
        </Drawer>
      </Hidden>
    </div>
  );
}

SideBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  routes: PropTypes.array,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  mobileOpen: PropTypes.bool,
  bgColor: PropTypes.oneOf(['blue', 'white', 'black']),
};

export default SideBar;
