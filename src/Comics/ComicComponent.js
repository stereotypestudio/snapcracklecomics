import React, {Component} from 'react';
import firebase from '../firebase';
import { ThemeContext } from '../theme-settings';
import AddCommentComponent from './AddCommentComponent';

class ComicComponent extends Component {

    constructor(){
        super();
        this.state = {
            currentImage:"",
            comicName:"",
            noNext: false,
            noPrev: false,
            postTitle: "",
            postContent: "",
            postId: "",
            comments: [],
            isLoading: true
        }

        this.prevComic = this.prevComic.bind(this);
        this.nextComic = this.nextComic.bind(this);
        this.firstComic = this.firstComic.bind(this);
        this.lastComic = this.lastComic.bind(this);
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
                this.setState({comicName: doc.data().comicName})
                console.log(this.state.currentImage);
                console.log(doc.id);
            })
        })
        .then(() => {
            this.getBlogInfo();
        })
        .then(() => {
            this.checkNextandPrev();
            this.getComments(this.state.postId);
            // const prev = fb.collection('comics')
            // .orderBy("createdAt")
            // .startAfter(this.state.currentImage)
            // .limit(1).get()
            // .then((nextComic) => {
            //     console.log("nextComic2", nextComic)
            //     if(nextComic.empty === true){
            //         this.setState({noNext: true})
            //     }
            // });
        });
        
    }

    prevComic(){
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
                this.setState({comicName: doc.data().comicName})
                this.setState({noNext: false})
            })
        })
        .then(() => {
            this.getBlogInfo();
        })
        .then(() => {
            this.checkNextandPrev();
            // const prev = fb.collection('comics')
            // .orderBy("createdAt", "desc")
            // .startAfter(this.state.currentImage)
            // .limit(1).get()
            // .then((prevComic) => {
            //     if(prevComic.empty === true){
            //         this.setState({noPrev: true})
            //     }
            // })
        });
    }

    nextComic(){
        const fb = firebase.firestore();
        const prev = fb.collection('comics')
        .orderBy("createdAt")
        .startAfter(this.state.currentImage)
        .limit(1).get()
        .then((nextComic) => {
            console.log("nextComic: ",nextComic)
            nextComic.forEach((doc) => {
                console.log("Ref: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc})
                this.setState({comicName: doc.data().comicName})
                this.setState({noPrev: false})
            })      
        })
        .then(() => {
            this.getBlogInfo();
        })
        .then(() => {
            this.checkNextandPrev();
            // const prev = fb.collection('comics')
            // .orderBy("createdAt")
            // .startAfter(this.state.currentImage)
            // .limit(1).get()
            // .then((nextComic) => {
            //     console.log("nextComic2", nextComic)
            //     if(nextComic.empty === true){
            //         this.setState({noNext: true})
            //     }
            // });
        })
    }

    //TODO: Fix bug disabling all buttons on going from first to last or vice versa

    lastComic(){
        console.log("Getting last comic");
        const fb = firebase.firestore();
        const prev = fb.collection('comics')
        .orderBy("createdAt", "desc")
        .limit(1).get()
        .then((lastComic) => {
            console.log("lastcomic: ", lastComic);
            lastComic.forEach((doc) => {
                console.log("lastcomic: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc})
                this.setState({comicName: doc.data().comicName})
            })
        })
        .then(() => {
            this.getBlogInfo();
        })
        .then(() => {
            this.checkNextandPrev();
        })
    }

    firstComic(){
        console.log("Getting first comic")
        const fb = firebase.firestore();
        const prev = fb.collection('comics')
        .orderBy("createdAt")
        .limit(1).get()
        .then((firstComic) => {
            firstComic.forEach((doc) => {
                console.log("Ref: ", doc.data());
                var img = document.getElementById('myimg');
                img.src = doc.data().imageUrl;
                this.setState({currentImage: doc})
                this.setState({comicName: doc.data().comicName})
            })    
        })
        .then(() => {
            this.getBlogInfo();
        })
        .then(() => {
            this.checkNextandPrev();
        })
    }

    checkNextandPrev(){
        const fb = firebase.firestore();
        const comicsRef = fb.collection('comics')
        comicsRef.orderBy("createdAt")
        .startAfter(this.state.currentImage)
        .limit(1).get()
        .then((nextComic) => {
            if(nextComic.empty === true){
                this.setState({noNext: true})
            }
        })
        .then(() => {
            comicsRef.orderBy("createdAt", "desc")
            .startAfter(this.state.currentImage)
            .limit(1).get()
            .then((prevComic) => {
                if(prevComic.empty === true){
                    this.setState({noPrev: true})
                }
            })
        })
    }

    getBlogInfo(){
        console.log("getting blog info")
        const fb = firebase.firestore();
        // console.log("image infor:", this.currentImage)
        fb.collection('posts').where("comicId", "==", this.state.currentImage.id).get()
        .then((doc) => {
            doc.forEach((post) => {
                console.log("Blog info:", post.data());
                this.setState({postTitle: post.data().title, postContent: post.data().content, postId: post.data().comicId})
                console.log(this.state.postId);
            })
        })
        .then(() => {
            this.getComments(this.state.postId)
        })
    }

    getComments(post){
        console.log("Getting comments");
        const fb = firebase.firestore();
        const commentsRef = fb.collection("comments").where("postId", "==", post).get()
        .then((docs) => {
            var comments = []
            docs.forEach((comment) => {    
                comments.push(comment.data())
                console.log("comment:", comment.data())
            })
            this.setState({comments: comments})
            console.log(this.state.comments);
        })
        .catch((error) => {
            console.log(error)
        })

    }

    render(){
        var {isLoading} = this.state;
        // var comments = this.state.comments.map((comment) => <li key ={comment.author.toString()}>{comment.comment.toString()}</li> );
        var comments = this.state.comments;
        var commentsList = comments.map(function(comment){
                return <div><li>{comment.author}</li><li> {comment.comment}</li></div>
        })
            return(
                <ThemeContext.Consumer>
                    {theme => (
                    <div>
                    <h2>{this.state.comicName}</h2>
                        <img style = {{width: "50%"}} id = "myimg"/>
                        <div>
                            <button style = {{backgroundColor: theme.background, color: theme.text}} className = "waves-effect waves-light btn " onClick = {this.firstComic} disabled = {this.state.noPrev}>First Comic</button>
                            <button style = {{backgroundColor: theme.background, color: theme.text}} className = "waves-effect waves-light btn" onClick = {this.prevComic} disabled = {this.state.noPrev}>Previous Comic</button>
                            <button style = {{backgroundColor: theme.background, color: theme.text}} className = "waves-effect waves-light btn" onClick = {this.nextComic} disabled = {this.state.noNext}>Next Comic</button>
                            <button style = {{backgroundColor: theme.background, color: theme.text}} className = "waves-effect waves-light btn" onClick = {this.lastComic} disabled = {this.state.noNext}>Last Comic</button>
                        </div>

                        <h3>{this.state.postTitle}</h3>
                        <p>{this.state.postContent}</p>
                        <ul>{commentsList}</ul>
    
                        <AddCommentComponent comicId = {this.state.currentImage.id} />      
                    </div>
                )}
                </ThemeContext.Consumer>
            )
    }
}

export default ComicComponent;