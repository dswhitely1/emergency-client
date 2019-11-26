import React from 'react';
import {Route} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import SideNavigation from "./side-navigation/SideNavigation";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import EditProfile from "./profile/EditProfile";
import ViewApplication from "../application/ViewApplication";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}))

function Dashboard(props) {
    const classes = useStyles();
    const {isOpen} = useSelector(state => state.nav);
    return (
        <>
            {isOpen && <SideNavigation/>}
            <main className={clsx(classes.content, {[classes.contentShift]: isOpen})}>
                <Typography variant='h4' className={classes.title}>Emergency Electric INC</Typography>
                <Route exact path='/dashboard' component={ViewApplication} />
                <Route exact path='/dashboard/profile' component={EditProfile} />
            </main>
        </>
    )
}

export default Dashboard;
