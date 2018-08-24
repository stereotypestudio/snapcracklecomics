import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import firebase, {auth} from '../firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch, NavLink } from "react-router-dom";
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

import UploadComicComponent from '../Comics/UploadComicComponent';
import { ComicComponent } from '../Comics/ComicComponent';
import AllComicComponent from '../Comics/AllComicComponent';
import Settings from '../Home/Settings';
import AddPostComponent from '../Comics/AddPostComponent';



class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            comics: [],
            loggedout: false,
            user: {},
            isLoading: true
        }

        this.logout = this.logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        const fb = firebase.firestore();
        // console.log("current user", auth.currentUser);
        // if(auth.currentUser){
        //     console.log("user:", auth.currentUser)
        //     fb.collection('users').doc(auth.currentUser.uid).get()
        //     .then((doc) => {
        //         this.setState({user: doc.data()});
        //         console.log(this.state.user);
        //         console.log(doc.data());
        //         this.setState({isLoading: false});
        //     })
        // } else {
        //     this.setState({isLoading: false});
        // }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user:", user)
                fb.collection('users').doc(user.uid).get()
                .then((doc) => {
                    this.setState({user: doc.data()});
                    console.log(this.state.user);
                    console.log(doc.data());
                    this.setState({isLoading: false});
                })
            }
            else {
                console.log("No user signed in")
                this.setState({isLoading: false});
            }
        });
    }

    logout(){
        this.setState({user: {}})
        auth.signOut();
    }

    render(){
        const {isLoading } = this.state;

        if(isLoading) { return <p>Loading...</p>}
        else{
            if (auth.currentUser){
                console.log("Admin", this.state.user.isAdmin)
                if(this.state.user.isAdmin === true) {
                    return(
                        <div>
                            <div className="App">
                                <header className="App-header">
                                    <h1 className="App-title">Comic Dash</h1>
                                </header>
                                <h2>Welcome to the dash!</h2>
                                <div className = "container">
                                    <div className = "row">
                                        <div className = "col s12">
                                            <Tabs defaultSelectedIndex={0}>
                                                <Tab value="pane-1" label="Upload Comic" >
                                                    <UploadComicComponent />
                                                </Tab>
                                                <Tab value="pane-2" label="See Comics">
                                                    <AllComicComponent />
                                                </Tab>
                                                <Tab value="pane-2" label="Site Settings">
                                                    <Settings />
                                                </Tab>
                                            </Tabs>
                                        </div> 
                                    </div> {/*end row */}
                                    <div className = "row">
                                         <button onClick= {this.logout} className = "btn btn-large">Log Out</button>
                                         <NavLink to= "/" className = "btn btn-large">Go Home</NavLink>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        
                    )}
                else{
                    return <Redirect to="/" />
                
                }   
            } else {
                return <Redirect to="/login" />
            }
        }
    }
}

export default Dashboard;



