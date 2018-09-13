import React, {Component} from 'react';
import firebase from '../firebase';
import ComicInfoComponent from './ComicInfoComponent';

class AllComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            currentComics: [],
            editComic: false,
        }

        this.editComic = this.editComic.bind(this);
    }

    componentDidMount(){
        var comics = []
        const fb = firebase.firestore();
        const comicCollection = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .limit(20).get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                console.log(doc);
                comics.push(doc);
            })
        })
        .then(() => {
            this.setState({currentComics: comics});
            console.log(this.state.currentComics);
        });

    }

    editComic(id, title){
        console.log("Comic", id, title)
    }

    render(){
        var comics = this.state.currentComics.map((comic, i) => {
     
           return <ComicInfoComponent key ={comic.id} comicTitle = {comic.data().comicName} id = {comic.id} imageUrl = {comic.data().imageUrl} editComic = {this.editComic} deleteComic = {this.deleteComic} />
        }
        );
        return(
            <div>
                <p>Comics:</p>
            
                {comics}
                <div hidden = {this.state.editComic}>
                    <p>I'm hidden!</p>
                </div>
           
            </div>
        )
    }
}

export default AllComicComponent;