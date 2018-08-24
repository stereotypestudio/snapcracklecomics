import React, {Component} from 'react';
import firebase from '../firebase';
import UploadComicComponent from './UploadComicComponent';

class AddPostComponent extends Component {

    constructor(){
        super();
        this.state = {
            content: "",
            title: "",
            author: ""
        }

        this.handleChange = this.handleChange.bind(this);
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

    }

    render(){

        return(
           <form onSubmit = {this.handleSubmit}>
            <label className="label">First Name</label>
            <div className="control">
                <input className="input" type="text" name="content" value={this.state.author} onChange={this.handleChange}/>
            </div>
            <label className="label">Post Title</label>
            <div className="control">
                <input className="input" type="text" name="content" value={this.state.title} onChange={this.handleChange}/>
            </div>
            <label className="label">Content</label>
            <div className="control">
                <input className="input" type="textarea" name="author" value={this.state.content} onChange={this.handleChange}/>
            </div>

            <UploadComicComponent />
           </form>
        )
    }
}

export default AddPostComponent