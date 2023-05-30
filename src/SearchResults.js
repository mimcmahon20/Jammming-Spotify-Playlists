import React from "react";
import TrackList from "./TrackList";

function SearchResults(props) {
    
    
    const tracks = [];
    
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks= {tracks}/>
        </div>
    ); 
};

export default SearchResults;