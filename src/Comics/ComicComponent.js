import React, {Component} from 'react';
import firebase from '../firebase';

class ComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            currentImage:""
        }
        var pathReference = firebase.storage().ref('comics/missing_profile.png');
        pathReference.getDownloadURL().then(function(url) {
            var img = document.getElementById('myimg');
            img.src = url;
        })
    }

    render(){
        return(
            <div>
                <h2>Comic compoenent here!</h2>
                <img id = "myimg" />
            </div>
        )
    }
}

export default ComicComponent;