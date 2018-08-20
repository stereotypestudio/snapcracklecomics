import React, {Component} from 'react';
import firebase from '../firebase';

class AddCommentComponent extends Component {

    constructor(){
        super();
        this.state = {
            comment: "",
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
                <input className="input" type="text" name="comment" value={this.state.comment} onChange={this.handleChange}/>
            </div>
            <div className="control">
                <input className="input" type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
            </div>
           </form>
        )
    }
}

export default AddCommentComponent