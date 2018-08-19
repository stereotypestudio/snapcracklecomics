import React, {Component} from 'react';
import firebase from '../firebase';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

class CreateUserComponent extends Component {

    constructor(){
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            fireRedirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fireRedirect = this.fireRedirect.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    fireRedirect(){
        this.setState({
            fireRedirect: true
        })
    }


    handleSubmit(event){
        event.preventDefault()
        firebase.firestore().collection('users').add({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id); 
        })
        .then(function(docRef){
        firebase.firestore().collection('settings').doc("setup").set({
                registered: true
            }).then(function(docRef){
                console.log("Document written with ID: ", docRef);
            })
        })
        .then(function(dofRef){
            this.fireRedirect();
        }.bind(this))
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    render(){

        const { fireRedirect } = this.state

        return(
            <div>
                <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Comic Dash</h1>
                </header>
                <form onSubmit = {this.handleSubmit}>
                    <label className="label">First Name</label>
                    <div className="control">
                        <input className="input" type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                    </div>
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input className="input" type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                    </div>
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button type= "submit" >Submit</button>
                </form>
                </div>

                {fireRedirect && (
                    <Redirect to='/dashboard'/>
                )}
            </div>
        )
    }
}

export default CreateUserComponent;