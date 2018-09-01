import React, {Component} from 'react';
import firebase from '../firebase';

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

    editComic(comic_id){
        console.log("getting comic", comic_id)
       const fb = firebase.firestore();
       const thisComic = fb.collection('comics').doc(comic_id).get()
       .then((comic) => {
           console.log(comic.data());
       })
    }

    render(){
        var comics = this.state.currentComics.map((comic, i) => 
            <div className = "card horizontal" key ={i}>
                <div className = "card-image">
                    <img src = {comic.data().imageUrl} alt = {comic.data().comicName} />
                </div>
                <div className = "card-stacked">
                    <div className = "card-content">
                    <span className = "card-title">{comic.data().comicName}</span>
                        Some filler content
                        Comic ID {comic.id}
                    </div>
                    <div className = "card-action">
                        <a href = "#" onClick = {this.editComic(comic.id)}>Edit Comic</a>
                        <a href = "#">Delete Comic</a>
                    </div>
                </div>
            </div> 
    
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