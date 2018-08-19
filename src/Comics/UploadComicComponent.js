import React, {Component} from 'react';
import firebase from '../firebase';

class UploadComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            selectedFile: null
        }

        this.fileChangedHandler.bind(this);
        this.uploadHandler.bind(this);
    }

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler = () => { 
        var date = new Date();
        var path = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + this.state.selectedFile.name;
        var storageRef = firebase.storage().ref()
        var comicsRef = storageRef.child("comics/" + path);
        comicsRef.put(this.state.selectedFile).then(function(snapshot) {
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
                post: 10,
                next: null
            })
            return ;
         })
         .catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
         });
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.fileChangedHandler} />
                 <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        )
    }
}

export default UploadComicComponent;