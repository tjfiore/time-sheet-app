import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { postRequest } from "../../services/api";


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  submit = (e) => {
    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;


    postRequest('/signin', {email: email, password: password})
    .then(res => res.json())
    .then(res => {
      if(res) {
        console.log(res);        
      }
    })
    .catch(err => console.log(err));

  }

  render(){

    return(
      <div>
        <form onSubmit={this.submit} >
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email"
              id="email"
              required
              onChange={(e) => this.setState({email: e.target.value})} />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input type="password"
              id="password"
              required
              onChange={(e) => this.setState({ password: e.target.value })} />
            
          </div>

         

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);