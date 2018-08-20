import React, {Component} from 'react';
import firebase from '../firebase';

class ComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            currentImage:"",
            nextImage:"",
            prevImage:""
        }

        this.prevComic = this.prevComic.bind(this);
        this.nextComic = this.nextComic.bind(this);
    }

    componentDidMount(){
        const fb = firebase.firestore();
        const lastComic = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .limit(1).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("Ref: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc});
                console.log(this.state.currentImage);
                console.log(doc.id);
            })
        });
        
    }

    prevComic(){
        console.log(this.state.currentImage);
        const fb = firebase.firestore();
        const prev = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .startAfter(this.state.currentImage)
        .limit(1).get()
        .then((prevComic) => {
            prevComic.forEach((doc) => {
                console.log("Ref: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc})
            })
        });
    }

    nextComic(){
        const fb = firebase.firestore();
        const prev = fb.collection('comics')
        .orderBy("createdAt")
        .startAfter(this.state.currentImage)
        .limit(1).get()
        .then((nextComic) => {
            nextComic.forEach((doc) => {
                console.log("Ref: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc})
            })
        });
    }

    consolelog(){
        console.log("Clicked!");
    }

    render(){
        return(
            <div>
                <h2>Comic compoenent here!</h2>
                <img style = {{width: 500}} id = "myimg" />
                <div>
                    <button onClick = {this.prevComic}>Previous Comic</button>
                    <button onClick = {this.nextComic}>Next Comic</button>
                </div>
            </div>
        )
    }
}

export default ComicComponent;