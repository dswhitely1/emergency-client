import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LandingPage from './Layouts/LandingPage';

function App() {
  return (
    <Switch>
      <Route path="/home" component={LandingPage} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
}

export default App;
