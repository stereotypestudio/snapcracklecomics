import React, {Component} from 'react';
import firebase from '../firebase';

class UploadComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            selectedFile: null,
            comicName:"",
            uploader: "",
            date:""
        }

        this.fileChangedHandler.bind(this);
        this.uploadHandler.bind(this);
        this.handleChange.bind(this);
        
    }

    componentDidMount(){
        const fb = firebase.firestore();
        const settings = {timestampsInSnapshots: true }
        fb.settings(settings);
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

    uploadHandler = () => { 
        var date = new Date();
        var path = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + this.state.selectedFile.name;
        var storageRef = firebase.storage().ref()
        var comicsRef = storageRef.child("comics/" + path);
        comicsRef.put(this.state.selectedFile)
        .then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            console.log("Snapshot",snapshot);

            return snapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            firebase.firestore().collection('comics').add({
                createdAt: date,
                imageUrl: downloadURL,
                uploader: "Bob",
                comicName: this.state.comicName,
            })
         })
         .catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
         });
    }

    render(){
        return(
            <div>
                <h4>Add a new comic!</h4>
                <label for = "comicName">Comic's name:</label>
                <input type="text" onChange = {this.handleChange} name = "comicName" />
                <input type="file" onChange={this.fileChangedHandler} />
                 <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        )
    }
}

export default UploadComicComponent;