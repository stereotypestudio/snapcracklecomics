import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import ComicComponent from '../Comics/ComicComponent';
import Header from '../Home/Header';
import {ThemeContext, themes} from '../theme-settings';


class Home extends Component {

    constructor(){
        super();
        this.state = {
            notRegistered: null,
            comicName: "",
            theme: themes.light, 
            isLoading: true
        }

        this.toggleTheme = this.toggleTheme.bind(this);
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
            this.setState({isLoading: false})
          };
        }.bind(this))
      }

      toggleTheme = () => {
        this.setState(state => ({
          theme:
            state.theme === themes.dark
              ? themes.light
              : themes.dark,
        }));
      };

    render(){
        var {isLoading} = this.state;

        if(isLoading){
            return <p>Loading...</p>
        } else {
            if(this.state.notRegistered) {
                return(
                    <p>Please finish registration! <NavLink to="/welcome">Register here!</NavLink> </p>
                )
            } else {
                return(
                    <ThemeContext.Provider value={this.state.theme}>
                        <div className = "homeContainer"> 
                                <Header />
                                <div className = "row">
                                    <div className = "col s2">Sidebar!</div>
                                    <div className = "col s10">
                                        {/* <button onClick = {this.toggleTheme}>Change theme!</button>
                                        Welcome to {this.state.comicName}! */}
                                        <ComicComponent />   
                                    </div>
                                </div>
                        </div>
                    </ThemeContext.Provider>
                )
            }
        }
    }
}

export default Home;