import React from "react";
import TrackList from "./TrackList";
import "./Playlist.css";

function Playlist(props) {
    const { playlistTracks, playlistName, onRemoveTrack, onResetPlaylist, onChangePlaylistName } = props;


    return (
        <div className="Playlist">
            <input className="Playlist-Name" value={playlistName} onChange={(e) => onChangePlaylistName(e.target.value)}/>
            <TrackList tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
            <button className="Playlist-save" onClick={onResetPlaylist}>Save</button>
        </div>
  );
}

export default Playlist;