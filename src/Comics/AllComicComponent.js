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
        const settings = {timestampsInSnapshots: true }
        fb.settings(settings);
        const comicCollection = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .limit(20).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("Ref: ", doc.data());
                comics.push(doc.data());
            })
        })
        .then(() => {
            this.setState({currentComics: comics});
            console.log(this.state.currentComics);
        });

    }

    render(){
        var comics = this.state.currentComics.map((comic) => <li>{comic.createdAt.toString()}</li> );
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