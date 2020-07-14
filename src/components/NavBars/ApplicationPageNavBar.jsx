import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { AppBar, Toolbar, Hidden } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'components/CustomButtons/Button';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: 0,
    marginBottom: 0,
    position: 'absolute',
    width: '100%',
    paddingTop: theme.spacing(1),
    zIndex: 1029,
    color: 'rgba(0, 0, 0, 0.87)',
    border: 0,
    borderRadius: 3,
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
    minHeight: 50,
    display: 'block',
  },
  container: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
    minHeight: 50,
  },
  flex: {
    flex: 1,
  },
  title: {
    lineHeight: '30px',
    fontSize: 18,
    borderRadius: 3,
    textTransform: 'none',
    color: 'inherit',
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    margin: '0 !important',
    letterSpacing: 'unset',
    '&:hover,&:focus': {
      background: 'transparent',
    },
  },
  appResponsive: {
    top: 8,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 10px 20px -12px rgba(0,0,0,0.42), 0 3px 20px 0 rgba(0,0,0,0.2)',
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
  },
  info: {
    backgroundColor: theme.palette.info,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 10px 20px -12px rgba(0,0,0,0.42), 0 3px 20px 0 rgba(0,0,0,0.2)',
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
  },
  success: {
    backgroundColor: theme.palette.success,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 10px 20px -12px rgba(0,0,0,0.42), 0 3px 20px 0 rgba(0,0,0,0.2)',
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
  },
  warning: {
    backgroundColor: theme.palette.warning,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 10px 20px -12px rgba(0,0,0,0.42), 0 3px 20px 0 rgba(0,0,0,0.2)',
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
  },
  danger: {
    backgroundColor: theme.palette.danger,
    color: theme.palette.common.white,
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 10px 20px -12px rgba(0,0,0,0.42), 0 3px 20px 0 rgba(0,0,0,0.2)',
    padding: theme.spacing(1, 0),
    transition: 'all 150ms ease 0s',
  },
  sidebarMinimize: {
    float: 'left',
    padding: theme.spacing(0, 0, 0, 2),
    display: 'block',
    color: 'rgba(0,0,0,0.87)',
  },
  sideBarMiniIcon: {
    width: 20,
    height: 17,
  },
}));
function ApplicationPageNavBar({
  color,
  brandText,
  miniActive,
  handleDrawerToggle,
  sideBarMinimize,
}) {
  const classes = useStyles();
  const appBarClasses = cx({ [classes.appBar]: true });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={classes.sidebarMinimize}>
            <Button justIcon onClick={sideBarMinimize}>
              {miniActive ? (
                <ViewList className={classes.sideBarMiniIcon} />
              ) : (
                <MoreVert className={classes.sideBarMiniIcon} />
              )}
            </Button>
          </div>
        </Hidden>
        <div className={classes.flex}>
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <div>Nav Bar Links</div>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
ApplicationPageNavBar.defaultProps = {
  brandText: 'Register Page',
};
ApplicationPageNavBar.propTypes = {
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sideBarMinimize: PropTypes.func,
};

export default ApplicationPageNavBar;
