import React, { Component } from "react";
import { getRequest, postRequest } from "../services/api";

import swal from "sweetalert2";
import moment from "moment";

class MainPage extends Component{
  state = {
    first_name: '',
    last_name: '',
    address: '',
    title:'',
    s_time: '',
    e_time: '',
    comments: '',
    client: 'Select Client',
    clients: [],
    showfields: false,
    showtimefield: false,
    hourdiff: null,
    mindiff: null,
    manager: '',
    position: '',
    date:'',
    dates: [],
    titleError:'',
    stimeError:'',
    etimeError:'',
    commentsError:'',
    clientError: '',
    dateError: '',
    
   
  }

  componentDidMount(){   
    const key = Object.keys(this.props.location.state);
        
    getRequest('/clients')
    .then(res => res.json())
    .then(res => {
      if(res){  
        this.setState({
          clients: res,
          first_name: this.props.location.state[key].first_name,
          last_name: this.props.location.state[key].last_name,
          address: this.props.location.state[key].address,
        });                   
      }            
    })
    .catch(err => console.log(err));
    
    // generate dates from 10 days of month to present date
    const startDate = new Date(moment().subtract(10, 'days').calendar()); 
    const endDate = new Date(); //YYYY-MM-DD

    const getDateArray = function (start, end) {
      const arr = [];
      let dt = new Date(start);
      while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    };

    const dateArr = getDateArray(startDate, endDate);

    const new_arr = [];
    dateArr.forEach(date => {
      let new_date = moment(date).format('ll');
      new_arr.push(new_date);
    });
    this.setState({dates: new_arr});
    
    
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

    const valuestart = this.state.s_time;
    const valuestop = e.target.value;
    
    //create date format          
    const hourStart = new Date("01/01/2007 " + valuestart).getHours();
    const hourEnd = new Date("01/01/2007 " + valuestop).getHours();
    const minStart = new Date("01/01/2007 " + valuestart).getMinutes();
    const minEnd = new Date("01/01/2007 " + valuestop).getMinutes();

    let hourDiff = hourEnd - hourStart;    
    let minDiff = minEnd - minStart;

    this.setState({
      hourdiff: (hourDiff < 0) ? hourDiff = hourStart - hourEnd : hourDiff,
      mindiff: (minDiff < 0) ? minDiff = minStart - minEnd : minDiff,
      showtimefield: true,
    });
    
    
  }


  handleSubmit = (e) => {
    e.preventDefault();

    if(!this.state.title){
      this.setState({titleError: 'Reqiured'});
    }else if(!this.state.client){
      this.setState({clientError: 'Reqiured'});
    }else if(!this.state.s_time){
      this.setState({stimeError: 'Reqiured'});
    }else if(!this.state.e_time){
      this.setState({etimeError: 'Reqiured'});
    }else if(!this.state.comments){
      this.setState({commentsError: 'Reqiured'});
    }else if(!this.state.date){
      this.setState({dateError: 'Reqiured'});
    }else{

      const userdata ={
        task_name: this.state.title,
        // client: this.state.client,
        start_time: this.state.s_time,
        end_time: this.state.e_time,
        comments: this.state.comments,
        sdate: this.state.date,
      }

      postRequest('/submit', {userdata})
      .then(res=>res.json())
      .then(res => {
        if(res){
          console.log(res);
          
          swal({ type: 'success', title: 'Successfully submitted!', text:""  }) 
        }
      })
      .catch(err => console.log(err));
    }

    
    
    
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
    const rendertimeField = (       
      <div className="form-group">       
        <p>Time spent: {this.state.hourdiff} hours and {this.state.mindiff} minutes</p>
      </div>      
   
    );

    return(
      <div className="align">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          { this.state.first_name && this.state.last_name && this.state.address ?
            <div className="row">
              <div className="col-sm-5">
                <div className="form-group">
                  <label>User Name</label>
                  <input type="text" name="title" className="form-control" placeholder="Enter name" required 
                  value={this.state.first_name +' '+ this.state.last_name} onChange={e => this.setState({ first_name: e.target.value })} />
                </div>
              </div>
              <div className="col-sm-7">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" className="form-control" placeholder="Enter address" required 
                  value={this.state.address} onChange={e => this.setState({ last_name: e.target.value })} />
                </div>
              </div>
            </div> :
            <center><h2> NO User Name or Address Available</h2></center>
          }
          
          <div className="form-group">
            <label>Task Title</label>
            <input type="text" name="title" className="form-control" placeholder="Enter task name" required
               onChange={e => this.setState({ title: e.target.value })} />  
             <span style={{color: 'red'}}>{this.state.titleError}</span>          
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
            <span style={{color: 'red'}}>{this.state.clientError}</span>         
          </div>

          {
            this.state.showfields ? renderFields : null
          }

          <div className="form-group">
            <label>Select Date</label>
            <select required onChange={e => this.setState({date: e.target.value})} className="form-control">
              {
                this.state.dates.map((date, i) => {
                  return <option key={i} value={date}>{date}</option>
                })
              }
            </select>
            <span style={{color: 'red'}}>{this.state.dateError}</span>
          </div>

          <div className="row">
            <div className="col-sm-3">
            <div className="form-group">
                <label>Start Time</label>
              <input type="time" name="start_time" required onChange={e => this.setState({ s_time: e.target.value })}  className="form-control" /> 
              <span style={{color: 'red'}}>{this.state.stimeError}</span>
            </div>       
            </div>
            <div className="col-sm-3">
            <div className="form-group">
              <label>End Time</label>
              <input type="time" name="end_time" required onChange={this.handleTimeChange} className="form-control" />
              <span style={{color: 'red'}}>{this.state.etimeError}</span> 
            </div>
            </div>
          </div>

          {
            this.state.showtimefield ? rendertimeField : null
          }

          <div className="form-group">
            <label >Comments</label>
            <textarea required onChange={e => this.setState({ comments: e.target.value })} rows="5" className="form-control comment-area" /> 
            <span style={{color: 'red'}}>{this.state.commentsError}</span>
          </div>
                   
      
          <button type="submit" className="btn submitBtn">Submit</button>
       
        </form>
      </div>
    );
  }  
}


export default (MainPage);