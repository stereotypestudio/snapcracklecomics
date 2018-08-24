import React, {Component} from 'react';
import firebase, {auth, provider} from '../firebase';
import {Router, Route, Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            toDash: false,
            toHome: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        // const fb = firebase.firestore();
        // const user = fb.collection('users').where("username", "==", this.state.username).get()
        // .then((doc) => {
        //     if(doc.exists){
        //         //redirct to dashboard
        //         <Redirect to="/dashboard"/>
        //     } else {
        //         //not found
        //     }
        // })
        auth.signInWithPopup(provider)
        .then((doc) => {
            return doc.user.uid
        })
        .then((id) => {
            firebase.firestore().collection('users').doc(id).get()
            .then((doc) => {
                if(doc.data().isAdmin === true){
                    this.setState({toDash: true})
                } else {
                    this.setState({toHome: true})
                }
            })
        })
        
    }

    render(){
        
        if(this.state.toDash === true){
            return <Redirect to="/dashboard"/>
        } else if (this.state.toHome === true){
            return <Redirect to="/" />
        } else {
        return(
            <div className = "container">
            <div className = "row">
            <div className = "col s6">
            <h4>Log in:</h4>
            <form onSubmit = {this.handleSubmit}>
                <label htmlFor="username">Email</label>
                <input type="email" onChange = {this.handleChange} name = "email" />
                <label htmlFor="password">Password</label>
                <input type="password" onChange = {this.handleChange} name = "password" />
                <button type = "submit">Login</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
    }
}

export default Login