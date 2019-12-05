import React, {useEffect} from 'react';
import {Route, useRouteMatch} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import SideNavigation from "./side-navigation/SideNavigation";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import EditProfile from "./profile/EditProfile";
import UserViewApplication from "../application/UserViewApplication";
import AddEmployment from "./employment/AddEmployment";
import EmploymentList from "./employment/EmploymentList";
import EducationList from "./education/EducationList";
import AddEducation from "./education/AddEducation";
import ReferenceList from "./references/ReferenceList";
import AddReference from "./references/AddReference";

const useStyles = makeStyles(theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(2)
    }
}));



function Dashboard(props) {
    const classes = useStyles();
    const {path} = useRouteMatch();
    const {isOpen} = useSelector(state => state.nav);
    const {isAdmin} = useSelector(state => state.auth);

    useEffect(()=> {
        if (isAdmin) props.history.push('/admin/dashboard')
    }, [isAdmin])

    return (
        <>
            {isOpen && <SideNavigation/>}
            <main className={clsx(classes.content, {[classes.contentShift]: isOpen})}>
                <Typography variant='h4' className={classes.title}>Emergency Electric INC</Typography>
                <Route exact path={path} component={UserViewApplication}/>
                <Route exact path={`${path}/profile`} component={EditProfile}/>
                <Route exact path={`${path}/employment`} component={EmploymentList}/>
                <Route exact path={`${path}/employment/add-employment`} component={AddEmployment}/>
                <Route exact path={`${path}/employment/edit/:id`} component={AddEmployment}/>
                <Route exact path={`${path}/education`} component={EducationList}/>
                <Route exact path={`${path}/education/add-education`} component={AddEducation}/>
                <Route exact path={`${path}/education/edit/:id`} component={AddEducation}/>
                <Route exact path={`${path}/references`} component={ReferenceList}/>
                <Route exact path={`${path}/references/add-reference`} component={AddReference}/>
                <Route exact path={`${path}/references/edit/:id`} component={AddReference}/>
            </main>
        </>
    )
}

export default Dashboard;
