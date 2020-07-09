import React from 'react';
import PropTypes from 'prop-types';
import ReduxProvider from './Redux/ReduxProvider';
import ActionsProvider from './Redux/ActionsProvider';
import StateProvider from './Redux/StateProvider';
import ReactRouterProvider from './ReactRouter/ReactRouterProvider';
import ThemeProvider from './Theme/ThemeProvider';

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
