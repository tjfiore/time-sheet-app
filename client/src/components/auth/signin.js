import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { postRequest } from "../../services/api";

import swal from "sweetalert2";


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
        res.error ? swal({ type: 'error', title: 'Something went wrong...', text: res.error }) : this.props.history.push('/mainpage', res);
      }
    })
    .catch(err => console.log(err));

  }

  render(){

    return(
      <div className="card">
        <center><h3>Login</h3></center>
        <div className="card-body">
          <form onSubmit={this.submit} className="form-horizontal">
            <div className="form-group">
              <label htmlFor="email" className="control-label col-sm-5">Email:</label>
              <div className="col-sm-10">
                <input type="email"
                  id="email"
                  className="form-control"
                  required
                  onChange={(e) => this.setState({email: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label col-sm-5">Password: </label>
              <div className="col-sm-10">
                <input type="password"
                  id="password"
                  className="form-control"
                  required
                  onChange={(e) => this.setState({ password: e.target.value })} />    
              </div>        
            </div>
          
            <div className="col-sm-6">
            <button type="submit" className="btn submitBtn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}



export default withRouter(SignIn);