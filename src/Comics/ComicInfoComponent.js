import React, { Component } from 'react';
class ComicInfoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            comicTitle: "",
            comicPost:"",
            imageUrl: "",
            comicId:""
        }
        this.consoleLogInfo = this.consoleLogInfo.bind(this);
    }

    consoleLogInfo(){

        this.props.editComic(this.props.id, this.props.imageUrl);
    }

    updateComic(){

    }
    render() { 
        return ( 
            <div className = "card horizontal" key ={this.props.id}>
            <div className = "card-image">
                <img src = {this.props.imageUrl} alt = {this.props.comicTitle} />
            </div>
            <div className = "card-stacked">
                <div className = "card-content">
                <span className = "card-title">{this.props.comicTitle}</span>
                    Some filler content
                    Comic ID {this.props.id}
                </div>
                <div id = "comic-form" hidden>
                    <form onSubmit = {this.updateComic}>
                        <input type = "text" placeholder = {this.props.comicTitle}></input>
                    </form>
                </div>
                <div className = "card-action">
                    <a href = "#" onClick = {this.consoleLogInfo}>Edit Comic</a>
                    <a href = "#">Delete Comic</a>
                </div>
            </div>
        </div> 
         );
    }
}
 
export default ComicInfoComponent;