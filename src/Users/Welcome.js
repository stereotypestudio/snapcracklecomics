import React, {Component} from 'react';
import firebase, {auth, provider} from '../firebase';
import bcrypt from 'bcryptjs';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import {Button, Icon, Toast, Input} from 'react-materialize';

class Welcome extends Component {

    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username:"",
            profilePicture: null,
            comicName: "",
            logoFile: null,
            headerImageFile: null,
            firstComic: null,
            fireRedirect: false,
            isLoading: true,
            registeredAlready: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.LogoHandleChange = this.LogoHandleChange.bind(this);
        this.HeaderHandleChange = this.HeaderHandleChange.bind(this);
        this.fireRedirect = this.fireRedirect.bind(this);
    }

    componentDidMount(){
        firebase.firestore().collection('settings').doc('setup').get()
        .then((doc) => {
            if(doc.exists === true){
                console.log(doc.data())
                if(doc.data().registered === true) {
                    this.setState({registeredAlready: true});
                    this.setState({isLoading: false});
                } 
                else {
                    this.setState({isLoading: false})
                }
            } else{
                console.log("No doc found")
                this.setState({isLoading: false})
            }
        })
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    LogoHandleChange(event){
        this.setState({logoFile: event.target.files[0]});
    }

    HeaderHandleChange(event){
        this.setState({headerImageFile: event.target.files[0]});
    }

    fireRedirect(){
        this.setState({
            fireRedirect: true
        })
    }

    handleSubmit(event){
        console.log("Submitting")
        event.preventDefault();
        var s = this.state;
        //pop up google to sign in
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            console.log(result.user)
            return result.user.uid;
         })
        .then((id) => { //update the new user information
            firebase.firestore().collection('users').doc(id).set({
                firstname: s.firstName,
                lastname: s.lastName,
                username: s.username,
                isAdmin: true
            })
        })
        .then(() => {
            console.log(auth.currentUser.displayName)
        })
        .then(function(){ //set comic params/details
            firebase.firestore().collection('setup').doc('comicSettings').set({
                comicName: s.comicName
            })
        })
        .then(function(docRef){ //set up initial setup so doesn't repeat in future
            firebase.firestore().collection('settings').doc("setup").set({
                    registered: true
            })
        })
        .then(() => {
            var storageRef = firebase.storage().ref()
            var siteImagesRef = storageRef.child("siteImages/logo");
            siteImagesRef.put(this.state.logoFile);
        })
        .then(() => {
            var storageRef = firebase.storage().ref();
            var headerImagesRef = storageRef.child("siteImages/header");
            headerImagesRef.put(this.state.headerImageFile);
        })
        .then(() => {
            console.log("Redirect")
            this.fireRedirect();
        })
        .catch((error) => {
            console.log("error updating", error)
        })

    }

    render(){

        const { registeredAlready, fireRedirect, isLoading } = this.state

        if(isLoading === true){
            return <p>Loading...</p>
        } else{
            if (registeredAlready === true){
                return <Redirect to="/login" />
            } else{
                return ( 
                    //Get admin information: Name, email, password, security question, profile picture
                    <div className = "container">
                        <div className="App">
                            <header className="App-header">
                                <h3 className="App-title">Comic Dash</h3>
                            </header>
                            <div className = "row">
                                <div className = "col s12">

                                <h3>Tell us about you:</h3>
                                    <form onSubmit = {this.handleSubmit}>
                                        <div className="control">
                                            <input className="input" placeholder = "First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                                        </div>
                                        <div className="control">
                                            <input className="input" placeholder = "Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                                        </div>
                                        <div className="control">
                                            <input className="input" placeholder = "And a username" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                                        </div>
                                        
                                    {// Get information about comic site: name of comic/site, logo, header image, colors, first comic (optional)

                                        //Optional pages: About
                                    }

                                    <h3>And the comic:</h3>
                                    <label className="label">Comic's Name</label>
                                    <div className="control">
                                        <input className="input" type="text" name="comicName" value={this.state.comicName} onChange={this.handleChange}/>
                                    </div>
                                    <h4>What's your comic's logo?</h4>
                                    <Input type="file"label="Pick File" placeholder = "Logo" onChange = {this.LogoHandleChange} name = "logoFile" s={12}/>
                                    <h4>And a header image?</h4>
                                    <Input type="file" label="Pick File" placeholder = "Header Image" onChange = {this.HeaderHandleChange} name = "headerFile" s={12}/>

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
    }
}

export default Welcome;