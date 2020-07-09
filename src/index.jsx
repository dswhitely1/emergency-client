import React from 'react';
import { render } from 'react-dom';
import Providers from 'Providers/Providers';
import App from './components/App';
import './index.scss';

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root'),
);
