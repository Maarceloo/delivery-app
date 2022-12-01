import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginProvider from './Context/LoginProvider';
import RegisterProvider from './Context/RegisterProvider';
import Login from './Pages/Login';
import Register from './Pages/Register';

class App extends Component {
  render() {
    return (
      <LoginProvider>
        <RegisterProvider>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
          </Switch>
        </RegisterProvider>
      </LoginProvider>
    );
  }
}

export default App;
