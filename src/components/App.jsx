import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from 'Views/HomePage/Footer';
import LandingPage from '../Layouts/LandingPage';
import ApplicationLayout from '../Layouts/ApplicationLayout';

function App() {
  return (
    <>
      <Switch>
        <Route path="/now-hiring" component={ApplicationLayout} />
        <Route path="/home" component={LandingPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
