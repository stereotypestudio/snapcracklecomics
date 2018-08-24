import React, {Component} from 'react';
import firebase, {auth, provider} from '../firebase';
import {Router, Route, Redirect } from 'react-router-dom';
import Header from '../Home/Header';

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
           <div>
                <Header />
                <div className = "loginPanel card">
                    <h2>Log in with your Google account:</h2>
                
                    <form onSubmit = {this.handleSubmit}>
                     <button className = "btn" type = "submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
    }
}

export default Login