import React from "react";
import "./AlbumCover.css";

function AlbumCover(props) {
    return (
        <div className="AlbumCover">
            <img className="Cover" src={props.src}/>
        </div>
    ); 
};

export default AlbumCover;