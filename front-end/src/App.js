import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './Pages/Login';

class App extends Component {
  render() {
    return (
      <Provider>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={ Login } />
        </Switch>

      </Provider>
    );
  }
}

export default App;
