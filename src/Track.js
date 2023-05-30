import React from "react";
import AlbumCover from "./AlbumCover";
import "./Track.css";

function Track(props) { 
    return (
        <div className="Track">
            <div className="Track-information">
                <AlbumCover src="../public/logo512.png" />
                <h3>Song Name</h3>
                <p>Artist Name</p>
            <div className="Commands">
                <button className="Track-action"> - </button>
                <button className="Track-action">+</button>
            </div>
            </div>
        </div>
    ); 
};

export default Track;