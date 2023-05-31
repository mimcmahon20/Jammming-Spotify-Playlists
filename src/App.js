import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {

  const [searchTracks, setSearchTracks] = useState([
    { key: 1,  SongName: "Song 1", ArtistName: "Artist 1", Action: "+" },
    { key: 2 ,  SongName: "Song 2", ArtistName: "Artist 2", Action: "+" },
    { key: 3 ,  SongName: "Song 3", ArtistName: "Artist 3", Action: "+" },
  ]);
  const [playlistTracks, setPlaylistTracks] = useState([
    { key: 5, SongName: "Song 5", ArtistName: "Artist 1", Action: "-" },
    { key: 6, SongName: "Song 6", ArtistName: "Artist 2", Action: "-" },
    { key: 7, SongName: "Song 7", ArtistName: "Artist 3", Action: "-" },
    { key: 4, SongName: "Song ", ArtistName: "Artist 4", Action: "-" },
  ]);

  function removeSearchTrack(key) {
    const updatedSearchTracks = searchTracks.filter((track) => track.key !== key);
    setSearchTracks(updatedSearchTracks);
  }
  
  function removePlaylistTrack(key) {
    const updatedPlaylistTracks = playlistTracks.filter((track) => track.key !== key);
    setPlaylistTracks(updatedPlaylistTracks);
  }

  function addPlaylistTrack(track) {
    const updatedPlaylistTracks = [...playlistTracks, track];
    setPlaylistTracks(updatedPlaylistTracks);
  }

  return (
    <div className="App">
      <h1 className="Heading">Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar />
      <div>
        <SearchResults
          searchTracks={searchTracks}
          onRemoveTrack={removeSearchTrack}
          onAddTrack={addPlaylistTrack}
        />
        <Playlist
          playlistTracks={playlistTracks}
          onRemoveTrack={removePlaylistTrack}
        />
      </div>
    </div>
  );
}

export default App;
