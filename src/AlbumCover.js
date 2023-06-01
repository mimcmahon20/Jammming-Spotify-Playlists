import React from "react";
import "./AlbumCover.css";

function AlbumCover(props) {
    return (
        <div className="AlbumCover">
            <img className="Cover" src={props.src} alt="album cover"/>
        </div>
    ); 
};

export default AlbumCover;