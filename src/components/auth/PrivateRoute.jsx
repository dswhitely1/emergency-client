import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/" />;
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
export default PrivateRoute;
