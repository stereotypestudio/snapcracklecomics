import React, {Component} from 'react';
import firebase from '../firebase';
import {Router, Route, Redirect } from 'react-router-dom';
import {Button, Icon, Toast, Input} from 'react-materialize';

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
            window.Materialize.toast('Setting updated!', 3000)

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
            <div>
                <h4>Settings:</h4>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label htmlFor="comicName">Comic's Name</label>
                        <input type="text" onChange = {this.handleChange} name = "comicName" />
                    </div>
                    <h4>Logo Image File</h4>
                    <Input type="file"label="Pick File" placeholder = "Logo" onChange = {this.LogoFileChangedHandler} name = "logoImageFile" s={12}/>
                     <h4>And a header image?</h4>
                    <Input type="file" label="Pick File" placeholder = "Header Image" onChange = {this.HeaderFileChangedHandler} name = "headerImageFile" s={12}/>
                    <button className = "btn btn-large" type = "submit">Save</button>
                </form>
            </div>
        )
    }
    }
}

export default Settings