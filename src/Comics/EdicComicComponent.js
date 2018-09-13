import React, { Component } from 'react';

class EditComicComponent extends Component {
    state = { 
        comicName: "",
        comicContent: "",
        comicFile:"",
     }

     componentDidMount() {
         
     }

    uploadHandler(){

    }

    handleChange(){

    }

    fileChangedHandler(){

    }

    render() { 
        return (
            <div>
                <button onClick = {() => this.props.editComic(id)}>Edit Comics</button>
                <form onSubmit = {this.uploadHandler} id ="upload-comic-form">
                <h3>Add a new comic!</h3>
                    <input className="input" placeholder = "Your name" type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
            
                     <input className="input" placeholder = "What would like to title this post?" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        
                    <div><Input s={12} type = "textarea" placeholder = "What's this comic about?" onChange = {this.handleChange} name = "content"></Input></div>
                    
                    <Input type="text" placeholder = "Name of the comic" onChange = {this.handleChange} name = "comicName" s={6}/>
                    <Input type="file" label="File" s={6} onChange={this.fileChangedHandler} placeholder = "Add the comic's image file" />
                    <p style = {{textAlign: "center"}}><button className = "btn block" type= "submit" >Upload!</button></p>
                </form>
            </div>
          );
    }
}
 
export default EditComicComponent;