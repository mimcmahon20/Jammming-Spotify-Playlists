import React from "react";
import TrackList from "./TrackList";
import "./Playlist.css";

function Playlist(props) {
    const { playlistTracks, playlistName, onRemoveTrack, onResetPlaylist, onChangePlaylistName } = props;

    const style = {width: 100}

    return (
        <div className="Playlist">
            <div className="playlist-heading">
                <input className="Playlist-Name" value={playlistName} onChange={(e) => onChangePlaylistName(e.target.value)}/>
                <button className="Playlist-save" onClick={onResetPlaylist}>Save</button>
            </div>
            <TrackList style={style} tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
        </div>
  );
}

export default Playlist;