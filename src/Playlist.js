import React, { useState } from "react";
import TrackList from "./TrackList";
import "./Playlist.css";

function Playlist(props) {
    const { playlistTracks, onRemoveTrack, onResetPlaylist } = props;

    const [ playlistTitle, setPlaylistTitle ] = useState("New Playlist");

    

    return (
        <div className="Playlist">
            <input className="Playlist-Name" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)}/>
            <TrackList tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
            <button className="Playlist-save" onClick={onResetPlaylist}>Save</button>
        </div>
  );
}

export default Playlist;