import React, {Component} from 'react';
import firebase from '../firebase';
import UploadComicComponent from '../Comics/UploadComicComponent';

class SidebarComponent extends Component {


    constructor(){
        super();
        this.state = {
            summary: ""
        }
    }

    componentDidMount(){
        const fb = firebase.firestore();
        fb.collection("settings").doc("summary").get()
        .then((doc) => {
            if(doc.exists === true){
                this.setState({summary: doc.data().summary})
            }
        })
        .then(() => {
            const fb = firebase.storage().ref();
            const LogoImageRef = fb.child('siteImages/logo');
            LogoImageRef.getDownloadURL()
            .then((url) => {
                 var img = document.getElementById('logo');
                img.src = url;
            })
        })
        .catch((error) => {
            console.log("No luck with logo images", error);
        })
    }

    render(){
        return(
            <div>
                <div className = "card">
                    <div className = "card-content">
                        <div className = "card-image">
                            <img src="" alt="" id = "logo" />
                            
                        </div>
                        <div className = "card-content">
                        <span className = "card-title">About the comic:</span>
                            <p>It's a cool comic!</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SidebarComponent;