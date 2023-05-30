import React, { useState } from "react";
import Track from "./Track";



function TrackList(props) {
    const [tracks, setTracks] = useState([]); // [tracks, setTracks
    
    console.log(props.tracks.length);

    function addTrack() {
        console.log("addTrack");
    }

    function removeTrack(id) {
        console.log("removeTrack: " + id);
        setTracks(tracks);
    }


    for(let i = 0; i < props.tracks.length; i++) {
        console.log(i);
        tracks.push(<Track
            id={props.tracks[i].id}
            SongName={props.tracks[i].SongName}
            ArtistName={props.tracks[i].ArtistName}
            Action={props.tracks[i].Action} 
            onRemove={removeTrack}
            onAdd={addTrack}
            />);
    }

    return (
        <div className="TrackList">
        {tracks}
        </div>
    ); 
};


export default TrackList;