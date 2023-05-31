import React from "react";
import Track from "./Track";


function TrackList(props) {
    const { tracks, onRemoveTrack, onAddTrack } = props;
    
    return (
      <div className="track-list">
        {tracks.map((track) => (
          <Track
            key={track.key} 
            track={track} 
            onRemoveTrack={onRemoveTrack} 
            onAddToPlaylist={onAddTrack}
          />
        ))}
      </div>
    );
}


export default TrackList;