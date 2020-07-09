import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from 'Views/Footer';
import LandingPage from '../Layouts/LandingPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/home" component={LandingPage} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
