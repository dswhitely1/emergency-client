import React, {useContext, useEffect} from 'react';
import {ActionsContext} from "../../contexts/ActionsContext";
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import {Typography} from "@material-ui/core";
import AdminSelectProfile from "./applications/AdminSelectProfile";
import AdminMessage from "./messages/AdminMessages";
import {StyledContainer, StyledTypography} from "../landing-page/styles/customStyles";

function AdminDashboard() {
    const actions = useContext(ActionsContext);
    const {token} = useSelector(state => state.auth);

    useEffect(() => {
        actions.admin.fetchUsers(token);
        actions.admin.fetchProfiles(token);
        actions.weather.fetchWeatherAlerts();
        actions.weather.fetchWeatherConditions();
        actions.admin.fetchMessages(token);
    }, [actions.admin, token]);

    useEffect(()=> {
        const interval = setInterval(()=> {
            actions.admin.fetchUsers(token);
            actions.admin.fetchProfiles(token);
            actions.admin.fetchMessages(token);
            actions.weather.fetchWeatherAlerts();
            actions.weather.fetchWeatherConditions();
        }, 1000*60*10)
        return ()=>clearInterval(interval)
    }, []);

    return (
        <StyledContainer max-Width='lg' top>
            <StyledTypography title variant='h4' component='h1'>Emergency Electric INC</StyledTypography>
            <Route exact path='/admin/dashboard/applications' component={AdminSelectProfile}/>
            <Route exact path='/admin/dashboard/messages' component={AdminMessage}/>
        </StyledContainer>
    )
}

export default AdminDashboard;
