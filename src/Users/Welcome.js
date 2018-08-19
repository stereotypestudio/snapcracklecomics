import React, {Component} from 'react';
import firebase from '../firebase';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

class Welcome extends Component {

    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
            securityQuestion:"",
            securityAnswer:"",
            profilePicture: null,
            comicName: "",
            logoFile: null,
            headerImageFile: null,
            firstComic: null,
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
        event.preventDefault();
        var s = this.state;
        firebase.firestore().collection('users').add({
            firstname: s.firstName,
            lastname: s.lastName,
            email: s.email,
            password: s.password,
            securityQuestion: s.securityQuestion,
            securityAnswer: s.securityAnswer,
            isAdmin: true
        })
        .then(function(){
            firebase.firestore().collection('setup').add({
                comicName: s.comicName
            })
        })
        .then(function(){
            this.fireRedirect();
        }.bind(this))
        .catch(function(error){
            console.log('Unable to create site', error)
        })
        
        
    }

    createUser(){
        var s = this.state;
        firebase.firestore().collection('users').add({
            firstname: s.firstName,
            lastname: s.lastName,
            email: s.email,
            password: s.password,
            securityQuestion: s.securityQuestion,
            securityAnswer: s.securityAnswer,
            isAdmin: true
        })
    }

    setupSite(){
        var s = this.state;
        
    }

    render(){

        const { fireRedirect } = this.state
        return ( 
            //Get admin information: Name, email, password, security question, profile picture
            
            <div className = "container">
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h3 className="App-title">Comic Dash</h3>
                    </header>
                    <div className = "row">
                        <div className = "col s6">

                        <h3>Admin:</h3>
                            <form onSubmit = {this.handleSubmit}>
                                <label className="label">First Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                                </div>
                                <label className="label">Last Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                                </div>

                                <label className="label">Username</label>
                                <div className="control">
                                    <input className="input" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                                </div>
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                <label className="label">Confirm Password</label>
                                <div className="control">
                                    <input className="input" type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
                                </div>
                                
                            {// Get information about comic site: name of comic/site, logo, header image, colors, first comic (optional)

                                //Optional pages: About
                            }

                            <h3>Comic:</h3>
                            <label className="label">Comic's Name</label>
                            <div className="control">
                                <input className="input" type="text" name="comicName" value={this.state.comicName} onChange={this.handleChange}/>
                            </div>
                            <div>
                                <input type="file" onChange={this.fileChangedHandler} />
                             </div>

                            <button type= "submit" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                {fireRedirect && (
                    <Redirect to='/dashboard'/>
                )}
            </div>
        
        )
        
    }
}

export default Welcome;