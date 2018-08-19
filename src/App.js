import React, { Component } from 'react';
import './App.css';
import firebase from './firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import  Dashboard  from './Dashboard/Dashboard';
import ComicComponent from './Comics/ComicComponent';
import CreateUserComponent from './Users/CreateUserComponent';
import UploadComicComponent from './Comics/UploadComicComponent';

class App extends Component {

  constructor(){
    super();
    this.state = {name:"Welcome", title:"", selectedFile: null, notRegistered: null}
    var db = firebase.firestore();
  
  }

  componentDidMount() {   
    var db = firebase.firestore();
    var initialRef = db.collection("settings").doc("setup").get()
    .then(function (doc){
      if (doc.exists){
        //good to go
        this.setState({notRegistered: false});
      } else {
        this.setState({notRegistered: true});
      };
    }.bind(this))
  }

   handleChange(e){
    this.setState({
      title: e.target.value
    })
   }

   handleSubmit = e => {
    e.preventDefault()
    firebase.firestore().doc('courses/online').set({name: this.state.title})
  }

  render() {
    // if(this.state.notRegistered === true){
    //   return <Redirect to='/register' />
    // }

    if (this.state.notRegistered === true){
      return <Redirect to="/welcome" />
    } else {
      return <Redirect to = "/dashboard" />
    }
   
  }
}

export default App;
