import React, {Component} from 'react';
import firebase from '../firebase';
import {Toast} from 'react-materialize';

class AddCommentComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            comment: "",
            author: "", 
            profileUrl: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const fb = firebase.firestore();
        console.log("Comic ID:",this.props.comicId);
        fb.collection("comments").add({
            postId: this.props.comicId,
            author: this.state.author,
            comment: this.state.comment,
            profileUrl: this.state.profileUrl
        })
        .then(() => {
            window.Materialize.toast('Comment added!', 3000)
            this.setState({author: ""});
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){

        return(
                <div>
                    <h3>Add a comment!</h3>
                    <form onSubmit = {this.handleSubmit} id="comment-form">
                        <div className="control">
                            <input className="input" value={this.state.author} placeholder="Your name" type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
                        </div>
                        <div className="control">
                            <input className="input" value={this.state.content} placeholder="Your comment" type="text" name="comment" value={this.state.comment} onChange={this.handleChange}/>
                        </div>
                        <div className="control">
                            <input className="input" value={this.state.profileUrl} placeholder="Profile Pic URL" type="text" name="profileUrl" value={this.state.profileUrl} onChange={this.handleChange}/>
                        </div>
                        <button className = "btn" type = "submit">Submit Comment</button>
                    </form>  
                </div>
        )
    }
}

export default AddCommentComponent