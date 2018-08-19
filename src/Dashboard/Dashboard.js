import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import UploadComicComponent from '../Comics/UploadComicComponent';
import { ComicComponent } from '../Comics/ComicComponent';


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            comics: []
        }
    }

    componentDidMount(){
        firebase.firestore().collection("comics").orderBy("createdAt").get()
        .then(function(querrySnapshot){
            var newArray = [];
            querrySnapshot.forEach(function(doc){  
                newArray.push(doc.data().imageUrl)
            })
            this.setState({comics: newArray});
            console.log(this.state.comics);

        }.bind(this))
    }

    render(){
        return(
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Comic Dash</h1>
                    </header>
                    <p className="App-intro">
                        Welcome to the dash!
                    </p>
                    {/* <ComicComponent /> */}
                    <UploadComicComponent />
                    <div>
                        {this.state.comics.map((comic) => {
                            return (  
                                <div key={comic}>
                                <img style = {{ width: '50%'}} src = {comic} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;



