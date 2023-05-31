import React from "react";
import AlbumCover from "./AlbumCover";
import "./Track.css";

function Track(props) { 
    
    const { track, onRemoveTrack, onAddToPlaylist } = props;

  function handleRemoveTrack() {
    onRemoveTrack(track.key);
    if(track.Action === "+") {
        track.Action = "-";
        onAddToPlaylist(track);
    }
  }

  return (
    <div className="track">
      <div className="track-info">
        <h3>{track.SongName}</h3>
        <p>{track.ArtistName}</p>
        <button className="commands" onClick={handleRemoveTrack}>{track.Action}</button>
      </div>
    </div>
  );
};

export default Track;