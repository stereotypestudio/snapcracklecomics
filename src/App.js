import React, { Component } from 'react';
import './App.css';
import firebase from './firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Dashboard from './Dashboard/Dashboard';
import Welcome from './Users/Welcome';
import Home from './Home/Home';
import AllComicComponent from './Comics/AllComicComponent';
import Login from './Users/Login';
import Settings from './Home/Settings';

class App extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      isRegistered: false
    }
  }

  

  componentDidMount(){
    const fb = firebase.firestore();
    const settingsRef = fb.collection("settings").doc("setup").get()
    .then((doc) => {
      if(doc.exists === true){
        this.setState({isRegistered: true})
        this.setState({isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    })

  
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
