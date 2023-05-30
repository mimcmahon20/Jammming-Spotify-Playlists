import React from "react";
import AlbumCover from "./AlbumCover";
import "./Track.css";

function Track(props) { 
    return (
        <div className="Track">
            <div className="Track-information">
                <AlbumCover src="../public/logo512.png" />
                <h3>{props.SongName}</h3>
                <p>{props.ArtistName}</p>
            <div className="Commands">
                <button className="Track-action" onClick={() => props.onRemove(props.id)}>{props.Action}</button>
            </div>
            </div>
        </div>
    ); 
};

export default Track;