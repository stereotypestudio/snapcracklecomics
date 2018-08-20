import React, {Component} from 'react';
import firebase from '../firebase';

class Header extends Component {

    constructor(){
        super();
       
    }

    componentWillMount(){
        const fb = firebase.storage().ref();
        const LogoImageRef = fb.child('siteImages/logo');
        LogoImageRef.getDownloadURL()
        .then((url) => {
            var img = document.getElementById('logo');
            img.src = url;
        })
        .then(() => {
            const HeaderImageRef = fb.child('siteImages/header');
            HeaderImageRef.getDownloadURL()
            .then((url) =>{
                var img = document.getElementById('header');
                img.src = url
            })
        })
        .catch((error) => {
            console.log("No luck with header images", error);
        })
    }

    render(){

        return(
            <header>
                <img src="" alt="" id = "logo" />
                <img src="" alt="" id = "header" />
            </header>
        )
    }
}

export default Header