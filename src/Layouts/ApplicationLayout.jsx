import React, { useState, useEffect, createRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'perfect-scrollbar';
import cx from 'classnames';
import EESmallLogo from 'assets/eeSmall.png';
import loggedOutRoutes from 'Views/ApplicationPage/loggedOutRoutes';
import SideBar from '../components/SideBar/SideBar';
import ApplicationPageNavBar from '../components/NavBars/ApplicationPageNavBar';
import LoginPage from '../Views/ApplicationPage/LoginPage';
import RegisterPage from '../Views/ApplicationPage/RegisterPage';
import Footer from '../Views/ApplicationPage/Footer';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 260px)',
    },
    overflow: 'auto',
    position: 'relative',
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.356, 1)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 80px)',
    },
  },
  mainPanelWithPerfectScrollbar: {
    overflow: 'hidden !important',
  },
}));
let ps;
function ApplicationLayout(props) {
  const { ...rest } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logo] = useState(EESmallLogo);
  const [logoText] = useState('Emergency Electric Inc');
  const [miniActive, setMiniActive] = useState(false);
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const [isWin] = useState(() => navigator.platform.indexOf('Win') > -1);
  const mainPanel = createRef();
  useEffect(() => {
    if (isWin) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollY: false,
        suppressScrollX: true,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);

    return () => {
      if (isWin) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const mainPanelClasses = cx({
    [classes.mainPanel]: true,
    [classes.mainPanelSidebarMini]: miniActive,
    [classes.mainPanelWithPerfectScrollbar]: isWin,
  });

  return (
    <div className={classes.wrapper}>
      <SideBar
        routes={loggedOutRoutes}
        logo={logo}
        logoText={logoText}
        handleDrawerToggle={handleDrawerToggle}
        miniActive={miniActive}
        {...rest}
      />
      <div ref={mainPanel} className={mainPanelClasses}>
        <ApplicationPageNavBar />
        <div className={classes.content}>
          <Switch>
            <Route path="/now-hiring/login" component={LoginPage} />
            <Route path="/now-hiring/register" component={RegisterPage} />
            <Redirect from="/now-hiring" to="/now-hiring/register" />
          </Switch>
        </div>
        <Footer fluid />
      </div>
    </div>
  );
}

export default ApplicationLayout;
