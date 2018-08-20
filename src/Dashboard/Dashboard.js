import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch, NavLink } from "react-router-dom";

import UploadComicComponent from '../Comics/UploadComicComponent';
import { ComicComponent } from '../Comics/ComicComponent';


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            comics: [],
            loggedout: false
        }

        this.logout = this.logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        const fb = firebase.firestore();
        const settings = {timestampsInSnapshots: true }
        fb.settings(settings);
        console.log(sessionStorage.getItem("loggedIn"));
        if(sessionStorage.getItem("loggedIn") === "no"){
            this.setState({loggedout: true});
        }
    }

    logout(){
        sessionStorage.setItem("loggedIn", "no");
        this.setState({loggedout: true});
    }

    render(){

        if (this.state.loggedout === true){
            return <Redirect to="/login" />
        } else {
            return(
                <div>
                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Comic Dash</h1>
                        </header>
                        <p className="App-intro">
                            Welcome to the dash!
                        </p>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col s3">
                                <p><NavLink to="/">Home</NavLink></p>
                                <p><NavLink to="/comics">Comics</NavLink></p>
                                <p><NavLink to="/settings">Settings</NavLink></p>
                                <p><NavLink to="/login" onClick = {this.logout}>Logout</NavLink></p>
                                </div>
                                <div className = "col s9">
                                <UploadComicComponent />
                                </div>

                            </div>
                        
                        </div>
                        {/* <ComicComponent /> */}
                    
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;



