import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';

function ReactRouterProvider({ children }) {
  return <Router>{children}</Router>;
}

ReactRouterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReactRouterProvider;
