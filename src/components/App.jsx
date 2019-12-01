import React from "react";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {Route, Switch} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import MainNavigation from "./navigation/MainNavigation";
import Login from "./auth/Login";
import {ActionsProvider} from "../contexts/ActionsContext";
import {useActions} from "../store/useActions";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import theme from './styles/theme';
import AdminRoute from "./admin-dashboard/AdminRoute";
import AdminDashboard from "./admin-dashboard/AdminDashboard";

function App() {
    const actions = useActions();
    return (
        <MuiThemeProvider theme={theme}>
            <ActionsProvider value={actions}>
                <CssBaseline/>
                <MainNavigation/>
                <Switch>
                    <AdminRoute path='/admin/dashboard' component={AdminDashboard} />
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <Route path='/register' render={props => <Login register={true} {...props} />}/>
                    <Route exact path='/' component={Login}/>
                </Switch>
            </ActionsProvider>
        </MuiThemeProvider>
    )
}

export default App;
