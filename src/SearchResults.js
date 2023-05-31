import React, { useState } from "react";
import TrackList from "./TrackList";

function SearchResults(props) {
    const { searchTracks, onRemoveTrack, onAddTrack } = props;

    return (
        <div className="SearchResults">
          <h2>Results</h2>
          <TrackList tracks={searchTracks} onRemoveTrack={onRemoveTrack} onAddTrack={onAddTrack} />
        </div>
      );
    }
    
    export default SearchResults;