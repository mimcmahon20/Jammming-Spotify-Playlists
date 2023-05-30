import React from "react";
import TrackList from "./TrackList";
import "./Playlist.css";

function Playlist(props) {
    const playlistTracks = [];

    for(let i = 0; i < 6; i++) {
        playlistTracks.push({id: i, SongName: i, ArtistName: "Artist Name", Action: "-"})
        console.log(playlistTracks);
    }

    return (
        <div className="Playlist">
            <input value="New Playlist"/>
            <TrackList tracks={playlistTracks}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    ); 
};

export default Playlist;