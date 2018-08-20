import React, { Component } from 'react';
import './App.css';
import firebase from './firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import  Dashboard  from './Dashboard/Dashboard';
import Welcome from './Users/Welcome';
import Home from './Home/Home';
import AllComicComponent from './Comics/AllComicComponent';
import Login from './Users/Login';
import Settings from './Home/Settings';

class App extends Component {

  constructor(){
    super();
    this.state = {name:"Welcome", title:"", selectedFile: null, notRegistered: null}
    var db = firebase.firestore();
  
  }

  render() {

    return(
      <Router>
        <div>
          
          <Route path="/" component={Home} exact />
          <Route path="/welcome" component={Welcome}  />
          <Route path="/dashboard" component={Dashboard}  />
          <Route path="/comics" component={AllComicComponent} />
          <Route path="/login" component={Login}  />
          <Route path="/settings" component={Settings}  />

        </div>
      </Router>
    )
   
  }
}

export default App;
