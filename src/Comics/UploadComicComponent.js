import React, {Component} from 'react';
import firebase from '../firebase';
import {Button, Icon, Toast} from 'react-materialize';

class UploadComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            selectedFile: null,
            comicName:"",
            uploader: "",
            date:"",
            author:"",
            content:"",
            title:""
        }

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount(){
    }


    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    uploadHandler = (event) => { 
        event.preventDefault();
        var date = new Date();
        var path = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + this.state.selectedFile.name;
        var storageRef = firebase.storage().ref()
        var comicsRef = storageRef.child("comics/" + path);
        comicsRef.put(this.state.selectedFile)
        .then(function(snapshot) {
            return snapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            var comic = null;
            return firebase.firestore().collection('comics').add({
                createdAt: date,
                imageUrl: downloadURL,
                uploader: "Bob",
                comicName: this.state.comicName,
            })
         })
         .then((doc)=>{
             console.log("id:", doc.id)
             firebase.firestore().collection('posts').add({
                 createdAt: date,
                 title: this.state.title,
                 content: this.state.content,
                 comicId: doc.id
             })
         })
         .then(() => {
             window.Materialize.toast('Succesfully uploaded!', 3000)
             document.getElementById("upload-comic-form").reset();
         })
         .catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
         });
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.uploadHandler} id ="upload-comic-form">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input className="input" type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
                    </div>
                    <label className="label">Post Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <label className="label">Content</label>
                    <div className="control">
                        <input className="input" type="textarea" name="content" value={this.state.content} onChange={this.handleChange}/>
                    </div>
                    <h4>Add a new comic!</h4>
                    <label htmlFor = "comicName">Comic's name:</label>
                    <input type="text" onChange = {this.handleChange} name = "comicName" />
                    <input type="file" onChange={this.fileChangedHandler} />
                    <button type= "submit" >Upload!</button>
                </form>
            </div>
        )
    }
}

export default UploadComicComponent;