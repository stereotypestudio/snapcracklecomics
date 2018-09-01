import React, {Component} from 'react';
import firebase from '../firebase';

class Header extends Component {

    constructor(){
        super();
       
    }

    componentWillMount(){
        const fb = firebase.storage().ref();
        const HeaderImageRef = fb.child('siteImages/header');
        HeaderImageRef.getDownloadURL()
        .then((url) =>{
                var img = document.getElementById('header');
                img.src = url
        })
        .catch((error) => {
            console.log("No luck with header images", error);
        })
    }

    render(){

        return(
            <header>
                <div className = "row">
                    <div className = "col s12">
                   
                        <img  style = {{width: "100%"}} src="" alt="" id = "header" />
                    
                    </div>
                </div>
            </header>
        )
    }
}

export default Header