import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import ComicComponent from '../Comics/ComicComponent';
import Header from '../Home/Header';

class Home extends Component {

    constructor(){
        super();
        this.state = {
            notRegistered: null,
            comicName: "",
        }
    }

    componentDidMount() {   
        var fb = firebase.firestore();
        var initialRef = fb.collection("settings").doc("setup").get()
        .then(function (doc){
          if (doc.exists){
            //good to go
            fb.collection('setup').doc('comicSettings').get()
            .then((doc) => {
                this.setState({comicName: doc.data().comicName});
            })
            this.setState({notRegistered: false});
          } else {
            this.setState({notRegistered: true});
          };
        }.bind(this))
      }

    render(){

        if(this.state.notRegistered) {
            return(
                <p>Please finish registration! <NavLink to="/welcome">Register here!</NavLink> </p>
            )
        } else {
            return(
                <div>
                
                <Header />
                Welcome to {this.state.comicName}!
                {/* <ComicComponent /> */}
                </div>
            )
        }
    }
}

export default Home;