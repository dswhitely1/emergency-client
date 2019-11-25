import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

function PrivateRoute({component: Component, ...rest}) {
    const {token} = useSelector(state => state.auth);
    if (token) {
        return <Route {...rest} render={props => <Component {...props} />} />
    }
    return <Redirect to='/' />
}

export default PrivateRoute;
