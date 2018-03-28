import React, { Component } from "react";
import { getRequest, postRequest } from "../services/api";

import swal from "sweetalert2";

class MainPage extends Component{
  state = {
    firstname: '',
    lastname: '',
    userAdd: '',
    title:'',
    s_time: '',
    e_time: '',
    comments: '',
    client: 'Select Client',
    clients: [],
    showfields: false,
    manager: '',
    position: '',
    dates: [],
   
  }

  componentDidMount(){   
    console.log(this.props.location.state);
      
    getRequest('/clients')
    .then(res => res.json())
    .then(res => {
      if(res){  
        this.setState({clients: res});             
      }            
    })
    .catch(err => console.log(err));

    
  }
   

  handleSelectChange = (e) => {
    this.setState({client: e.target.value}) 

    if (e.target.value !== 'Select Client'){
      postRequest('/position/manager', { data: e.target.value })
        .then(res => res.json())
        .then(res => {
          if (res) {
            const key = Object.keys(res); 

            this.setState({
              manager: res[key].manager_name,
              position: res[key].position,
              showfields: true
            });
          }
        })
        .catch(err => console.log(err));
    }
   
   
  }

  handleTimeChange = (e) => {
    this.setState({ e_time: e.target.value });

    console.log('Start time: ',this.state.s_time);
    console.log('End time: ', e.target.value);

  
    
  }


  handleSubmit = (e) => {
    e.preventDefault();
    swal({ type: 'success', title: 'Successfully submitted!', text:""  }) 
    
  }

  render(){

    const renderFields = (
      <div className="row ">  
        <div className="col-sm-6"> 
          <div className="form-group">       
            <label>Client's Manager</label>
            <input type="text" value={this.state.manager} className="form-control" disabled/> 
          </div>    
        </div>

        <div className="col-sm-6">   
          <div className="form-group">   
            <label> Client's Position</label>  
            <input type="text" value={this.state.position} className="form-control" disabled />
          </div>
        </div>
      </div>
    );

    return(
      <div className="align">
        <form onSubmit={this.handleSubmit} className="form-horizontal">

          <div className="form-group">
            <label>Task Title</label>
             <input type="text" name="title" className="form-control" placeholder="Enter task name" 
               onChange={e => this.setState({ title: e.target.value })} />
            
          </div>

          <div className="form-group">            
            <select required value={this.state.client} onChange={this.handleSelectChange} className="form-control">
              <option disabled>Select Client</option>
              {
                this.state.clients.map(client => {
                  return <option key={client.id} value={client.client_name}>
                  {client.client_name}</option>
                })
              }
            </select>           
          </div>

          {
            this.state.showfields ? renderFields : null
          }

          <div className="form-group">
            <select required className="form-control">
              {
                this.state.dates.map((date, i) => {
                  return <option key={i} value={date}>{date}</option>
                })
              }
            </select>
          </div>

          <div className="row">
            <div className="col-sm-3">
            <div className="form-group">
                <label>Start Time</label>
              <input type="time" name="start_time" onChange={e => this.setState({ s_time: e.target.value })}  className="form-control" /> 
            </div>       
            </div>
            <div className="col-sm-3">
            <div className="form-group">
              <label>End Time</label>
              <input type="time" name="end_time" onChange={this.handleTimeChange} className="form-control" /> 
            </div>
            </div>
          </div>

          <div className="form-group">
            <label >Comments</label>
            <textarea onChange={e => this.setState({ comments: e.target.value })} rows="5" className="form-control comment-area" /> 
          </div>
            
         
          <div className="col-sm-6">
            <button type="submit" className="btn submitBtn">Submit</button>
          </div>
        </form>
      </div>
    );
  }  
}


export default (MainPage);