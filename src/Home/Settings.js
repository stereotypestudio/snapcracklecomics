import React, {Component} from 'react';
import firebase from '../firebase';
import {Router, Route, Redirect } from 'react-router-dom';

class Settings extends Component {

    constructor(){
        super();
        this.state = {
            comicName:"",
            headerImageUrl:"",
            logoImageUrl:"",
            headerImageFile: null,
            logoImageFile: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.LogoFileChangedHandler = this.LogoFileChangedHandler.bind(this);
        this.HeaderFileChangedHandler = this.HeaderFileChangedHandler.bind(this);
       
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
        const s = this.state;
        firebase.firestore().collection('setup').doc('comicSettings').set({
            comicName: s.comicName
        })
        .then(() => {
            var storageRef = firebase.storage().ref()
            var siteImagesRef = storageRef.child("siteImages/logo");
            siteImagesRef.put(this.state.logoImageFile);
        })
        .then(() => {
            var storageRef = firebase.storage().ref();
            var headerImagesRef = storageRef.child("siteImages/header");
            headerImagesRef.put(this.state.headerImageFile);
        })
        .catch((error) => {
            console.log("Couldn't update settings", error);
        })

    }

    LogoFileChangedHandler = (event) => {
        this.setState({logoImageFile: event.target.files[0]});
        console.log(this.state.logoImageFile);
    }

    HeaderFileChangedHandler = (event) => {
        this.setState({headerImageFile: event.target.files[0]});
        console.log(this.state.headerImageFile);
        console.log(event.target.files[0]);
    }

    render(){
        
        if(this.state.toDash === true){
            return <Redirect to="/dashboard"/>
        } else {
        return(
            <div className = "container">
            <div className = "row">
            <div className = "col s6">
            <h4>Log in:</h4>
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <label htmlFor="comicName">Comic's Name</label>
                    <input type="text" onChange = {this.handleChange} name = "comicName" />
                </div>
                <div>
                    <label htmlFor = "logoImageFile">Logo Image</label>
                    <input type="file" onChange={this.LogoFileChangedHandler} />
                </div>
                 <div>
                    <label htmlFor = "headerImageFile">Header Image</label>
                    <input type="file" onChange={this.HeaderFileChangedHandler} />
                 </div>
                    <button type = "submit">Login</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
    }
}

export default Settings