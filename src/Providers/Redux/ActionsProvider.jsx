import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from 'store/useActions';

export const ActionsContext = createContext({});

function ActionsProvider({ children }) {
  const actions = useActions();

  return (
    <ActionsContext.Provider value={actions}>
      {children}
    </ActionsContext.Provider>
  );
}

ActionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ActionsProvider;
