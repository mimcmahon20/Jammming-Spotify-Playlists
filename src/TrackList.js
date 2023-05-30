import React from "react";
import Track from "./Track";

function TrackList(props) {
    const tracks = props.tracks;
    
    return (
        <div className="TrackList">
            {/* {tracks.map(track => {
                return <Track key={track.id} track={track} />;
            })} */}
            <Track ></Track>
            <Track ></Track>
            <Track ></Track>
        </div>
    ); 
};

export default TrackList;