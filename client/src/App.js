import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import SignIn from "./components/auth/signin";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={SignIn} /> 
      </div>
    );
  }
}

export default App;
