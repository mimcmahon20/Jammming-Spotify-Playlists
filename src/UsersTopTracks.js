import React from "react";
import TrackList from "./TrackList";
import RefreshIcon from './refresh-svgrepo-com.svg';
import "./UsersTopTracks.css";

function UsersTopTracks(props) {
    const { refreshTopTracks, topTracks, onRemoveTrack, onAddTrack } = props;

    return (
        <div className="UsersTopTracks">
            <div className="heading">
                <h2>Your Top Songs</h2>
                <button className="Refresh" onClick={refreshTopTracks}>
                    <img src={RefreshIcon} alt="Refresh Icon" className="refresh-icon" />
                </button>
            </div>
            <TrackList tracks={topTracks} onRemoveTrack={onRemoveTrack} onAddTrack={onAddTrack} />
        </div>
    );
}
    
export default UsersTopTracks;