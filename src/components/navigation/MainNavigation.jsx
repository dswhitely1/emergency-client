import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from "react-redux";
import {ActionsContext} from "../../contexts/ActionsContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
    const isAuth = useSelector(state => Boolean(state.auth.token));
    const {isOpen} = useSelector(state => state.nav);
    const actions = useContext(ActionsContext);
    return (
        <div className={classes.root}>
            <AppBar position='static' className={clsx(classes.appBar, {[classes.appBarShift]: isOpen})}>
                <Toolbar>
                    {isAuth &&
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={actions.nav.toggleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, isOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Typography variant='h6' className={classes.title}>
                        Emergency Electric INC
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MainNavigation;
