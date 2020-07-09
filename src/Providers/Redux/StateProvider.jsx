import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const StateDataContext = createContext({});

function StateProvider({ children }) {
  const reduxData = useSelector((state) => state);
  return (
    <StateDataContext.Provider value={reduxData}>
      {children}
    </StateDataContext.Provider>
  );
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
