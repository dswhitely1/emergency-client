import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const palette = {
  primary: { main: '#670300' },
  secondary: { main: '#b48a66' },
  error: { main: '#a80400' },
  background: {
    default: '#fbf7f5',
  },
};

const overrides = {
  MuiCssBaseline: {
    '@global': {
      html: {
        fontSize: '62.5%',
      },
    },
  },
};

const typography = {
  htmlFontSize: 10,
  fontFamily: '"Lato", sans-serif',
  h1: {
    fontFamily: '"Raleway", sans-serif',
  },
  h2: {
    fontFamily: '"Raleway", sans-serif',
  },
  h3: {
    fontFamily: '"Raleway", sans-serif',
  },
  h4: {
    fontFamily: '"Raleway", sans-serif',
  },
  h5: {
    fontFamily: '"Raleway", sans-serif',
  },
  h6: {
    fontFamily: '"Raleway", sans-serif',
  },
};
const themeName = 'Emergency Electric';

const theme = createMuiTheme({ palette, themeName, typography, overrides });

export default responsiveFontSizes(theme);
