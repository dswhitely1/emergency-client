import React from 'react';
import {
  StylesProvider,
  MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from './theme';

function ThemeProvider({ children }) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
