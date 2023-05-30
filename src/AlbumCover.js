import React from "react";

function AlbumCover(props) {
    return (
        <div className="AlbumCover">
            <img src={props.src}/>
        </div>
    ); 
};

export default AlbumCover;