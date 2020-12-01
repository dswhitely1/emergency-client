import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function AdminRoute({ component: Component, ...rest }) {
  const { isAdmin } = useSelector((state) => state.auth);

  if (isAdmin) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/" />;
}

AdminRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default AdminRoute;
