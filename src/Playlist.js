import React, { useState } from "react";
import TrackList from "./TrackList";

function Playlist(props) {
    const { playlistTracks, onRemoveTrack } = props;

    const [ playlistTitle, setPlaylistTitle ] = useState("New Playlist");


    return (
        <div className="Playlist">
            <input value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)}/>
            <TrackList tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
  );
}

export default Playlist;