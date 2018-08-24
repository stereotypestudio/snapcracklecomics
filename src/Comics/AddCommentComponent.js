import React, {Component} from 'react';
import firebase from '../firebase';
import {Toast} from 'react-materialize';

class AddCommentComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            comment: "",
            author: ""
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
        })
        .then(() => {
            window.Materialize.toast('Comment added!', 3000)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){

        return(
        <div className= "App">
            <div className ="row">
                <div className = "col s6">
                    <form onSubmit = {this.handleSubmit}>
                        <label className="label">Your name</label>
                        <div className="control">
                            <input className="input" type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
                        </div>
                        <label className="label">Your comment</label>
                        <div className="control">
                            <input className="input" type="text" name="comment" value={this.state.comment} onChange={this.handleChange}/>
                        </div>
                        <button className = "btn" type = "submit">Submit Comment</button>
                    </form>
                </div>
            </div>    
        </div>
        )
    }
}

export default AddCommentComponent