import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ActionsContext } from '../../contexts/ActionsContext';
import HomePageButtons from './buttons/HomePageButtons';
import InfoButton from './buttons/InfoButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

function MainNavigation() {
  const classes = useStyles();
  const isAuth = useSelector((state) => Boolean(state.auth.token));
  const { isAdmin } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.nav);
  const { profiles, messages } = useSelector((state) => state.admin);
  const actions = useContext(ActionsContext);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {isAuth && !isAdmin && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={actions.nav.toggleDrawer}
              edge="start"
              className={clsx(classes.menuButton, isOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="body2" className={classes.title}>
            Emergency Electric INC
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {!isAuth && <HomePageButtons />}
          {isAdmin && isAuth && (
            <InfoButton
              color="secondary"
              name="Messages"
              url="/admin/dashboard/messages"
              value={messages.filter(({ read }) => read !== true).length}
            />
          )}
          {isAdmin && isAuth && (
            <InfoButton
              color="secondary"
              name="Applications"
              url="/admin/dashboard/applications"
              value={profiles.length}
            />
          )}
          {isAuth && (
            <Button onClick={actions.auth.logout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainNavigation;
