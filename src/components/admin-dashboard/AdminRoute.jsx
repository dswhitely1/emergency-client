import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute({ component: Component, ...rest }) {
  const { isAdmin } = useSelector((state) => state.auth);

  if (isAdmin) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/" />;
}

export default AdminRoute;
