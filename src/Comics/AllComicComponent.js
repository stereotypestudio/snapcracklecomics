import React, {Component} from 'react';
import firebase from '../firebase';

class AllComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            currentComics: []
        }
    }

    componentDidMount(){
        var comics = []
        const fb = firebase.firestore();
        const comicCollection = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .limit(20).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                comics.push(doc.data());
            })
        })
        .then(() => {
            this.setState({currentComics: comics});
        });

    }

    render(){
        var comics = this.state.currentComics.map((comic) => <li key ={comic.createdAt.toString()}>{comic.createdAt.toString()}</li> );
        return(
            <div>
                <p>Comics:</p>
            <ul>
            {comics}
            </ul>
           
            </div>
        )
    }
}

export default AllComicComponent;