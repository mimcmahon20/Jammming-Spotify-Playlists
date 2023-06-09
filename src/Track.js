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
        <AlbumCover src={track.AlbumSrc} />
        <div className="artist-title">
          <h3>{track.SongName}</h3>
          <p>{track.ArtistName}</p>
        </div>
      </div>
        <button className="commands" onClick={handleRemoveTrack}>{track.Action}</button>
    </div>
  );
};

export default Track;