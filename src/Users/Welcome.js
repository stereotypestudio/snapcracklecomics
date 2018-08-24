import React, {Component} from 'react';
import firebase, {auth, provider} from '../firebase';
import logo from '../logo.svg';
import bcrypt from 'bcryptjs';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

class Welcome extends Component {

    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username:"",
            email:"",
            securityQuestion:"",
            securityAnswer:"",
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

    fireRedirect(){
        this.setState({
            fireRedirect: true
        })
    }

    handleSubmit(event){

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
                email: s.email,
                username: s.username,
                securityQuestion: s.securityQuestion,
                securityAnswer: s.securityAnswer,
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
    }
}

export default Welcome;