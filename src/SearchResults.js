import React from "react";
import TrackList from "./TrackList";
import "./SearchResults.css";

function SearchResults(props) {
    const { searchTracks, onRemoveTrack, onAddTrack } = props;

    return (
        <div className="SearchResults">
          <h2 class="search-heading">Results</h2>
          <TrackList tracks={searchTracks} onRemoveTrack={onRemoveTrack} onAddTrack={onAddTrack} />
        </div>
      );
    }
    
    export default SearchResults;