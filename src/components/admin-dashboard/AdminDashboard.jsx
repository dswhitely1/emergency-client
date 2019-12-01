import React, {useContext, useEffect} from 'react';
import {ActionsContext} from "../../contexts/ActionsContext";
import {useSelector} from "react-redux";
import AdminSelectProfile from "./AdminSelectProfile";

function AdminDashboard() {
    const actions = useContext(ActionsContext);
    const {token} = useSelector(state => state.auth);
    
    useEffect(()=> {
        actions.admin.fetchUsers(token);
        actions.admin.fetchProfiles(token);
        actions.weather.fetchWeatherAlerts();
        actions.weather.fetchWeatherConditions();
    }, [actions.admin, token]);

    return (
        <>
            <AdminSelectProfile/>
            </>
    )
}

export default AdminDashboard;
