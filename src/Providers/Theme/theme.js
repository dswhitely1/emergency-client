import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const palette = {
  primary: { main: '#670300' },
  secondary: { main: '#b48a66' },
  error: { main: '#a80400' },
  background: {
    default: '#fbf7f5',
  },
};

const customPalette = {
  gray: [
    '#999',
    '#777',
    '#3C4858',
    '#AAAAAA',
    '#D2D2D2',
    '#DDD',
    '#555555',
    '#333',
    '#eee',
    '#ccc',
    '#e4e4e4',
    '#E5E5E5',
    '#f9f9f9',
    '#f5f5f5',
    '#495057',
    '#e7e7e7',
    '#212121',
    '#c8c8c8',
    '#505050',
  ],
  danger: [
    '#f44336',
    '#ef5350',
    '#e53935',
    '#f55a4e',
    '#d32f2f',
    '#ebcccc',
    '#f2dede',
  ],
  success: [
    '#4caf50',
    '#66bb6a',
    '#43a047',
    '#5cb860',
    '#388e3c',
    '#d0e9c6',
    '#dff0d8',
  ],
  warning: [
    '#ff9800',
    '#ffa726',
    '#fb8c00',
    '#ffa21a',
    '#f57c00',
    '#faf2cc',
    '#fcf8e3',
  ],
  info: [
    '#00acc1',
    '#26c6da',
    '#00acc1',
    '#00d3ee',
    '#0097a7',
    '#c4e3f3',
    '#d9edf7',
  ],
  primary: ['#9c27b0', '#ab47bc', '#8e24aa', '#af2cc5', '#7b1fa2'],
  secondary: ['#e91e63', '#ec407a', '#d81b60', '#eb3573', '#c2185b'],
};

const clearFix = {
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
};

const containerFluid = {
  paddingRight: 15,
  paddingLeft: 15,
  marginRight: 'auto',
  marginLeft: 'auto',
  ...clearFix,
};

const container = {
  ...containerFluid,
  '@media (min-width: 768px)': {
    width: 750,
  },
  '@media (min-width: 992px)': {
    width: 970,
  },
  '@media (min-width: 1200px)': {
    width: 1170,
  },
};

const title = {
  color: '#3c4858',
  textDecoration: 'none',
  fontWeight: 300,
  marginTop: 30,
  marginBottom: 15,
  minHeight: 32,
  '& small': {
    color: '#777',
    fontSize: '65%',
    fontWeight: 400,
    lineHeight: 1,
  },
};

const cardTitle = {
  ...title,
  marginTop: 0,
  marginBottom: 3,
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '.075rem',
    minHeight: 'auto',
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
  MuiLink: {
    underlineHover: {
      '&:hover': {
        textDecoration: 'none',
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

const theme = createMuiTheme({
  palette,
  themeName,
  typography,
  overrides,
  customTheme: {
    cardTitle,
    container,
    containerFluid,
    title,
    palette: customPalette,
  },
});

console.log(theme);

export default responsiveFontSizes(theme);
