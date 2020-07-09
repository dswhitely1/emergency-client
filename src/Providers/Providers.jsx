import React from 'react';
import PropTypes from 'prop-types';
import ReduxProvider from 'Providers/Redux/ReduxProvider';
import ActionsProvider from 'Providers/Redux/ActionsProvider';
import StateProvider from 'Providers/Redux/StateProvider';
import ReactRouterProvider from 'Providers/ReactRouter/ReactRouterProvider';
import ThemeProvider from 'Providers/Theme/ThemeProvider';

function Providers({ children }) {
  return (
    <ReduxProvider>
      <ActionsProvider>
        <StateProvider>
          <ReactRouterProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReactRouterProvider>
        </StateProvider>
      </ActionsProvider>
    </ReduxProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
