import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from '@material-ui/icons/Home';
import {useSelector} from "react-redux";
import {ActionsContext} from "../../../contexts/ActionsContext";
import {Link as RouterLink} from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

function SideNavigation() {
    const classes = useStyles();
    const theme = useTheme();
    const {isOpen} = useSelector(state => state.nav);
    const actions = useContext(ActionsContext);
    return (
        <Drawer className={classes.drawer} variant="permanent" anchor="left" open={isOpen}
                classes={{paper: classes.drawerPaper}}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={actions.nav.toggleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem button component={RouterLink} to='/dashboard'>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button component={RouterLink} to='/dashboard/profile'>
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Personal Data" />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideNavigation
