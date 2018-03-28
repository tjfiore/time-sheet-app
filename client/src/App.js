import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './stylesheets/style.css';
import SignIn from "./components/auth/signin";
import MainPage from "./components/mainpage";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={SignIn} /> 
        <Route exact path="/mainpage" component={MainPage} /> 
      </div>
    );
  }
}

export default App;
