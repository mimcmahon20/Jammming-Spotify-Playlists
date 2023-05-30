import React from "react";
import TrackList from "./TrackList";

function SearchResults(props) {
    const searchTracks = [];
    
    for(let i = 0; i < 3; i++) {
        searchTracks.push({id: i, SongName: i, ArtistName: "Artist Name", Action: "+"})
        console.log(searchTracks);
    }

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks= {searchTracks}/>
        </div>
    ); 
};

export default SearchResults;