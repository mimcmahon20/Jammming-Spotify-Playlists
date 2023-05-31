import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import axios from 'axios';

function App() {
  const CLIENT_ID = "8546073d8994458e920834495ed2eaea";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [ token, setToken ] = useState(null);

  useEffect(() => { 
    const hash = window.location.hash
    let token = window.localStorage.getItem("token");
    if(!token && hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];
      window.localStorage.setItem("token", token);
      window.location.hash = "";
    }
    setToken(token);
  });



  const auth = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  

  function logout() {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  const [searchKey, setSearchKey] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

  
  const searchSongs = async (e) => {
    const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${searchKey}&type=track`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: searchKey, type: "track", limit: 5}
    });
    console.log(data);
    console.log(data.tracks.items);
    console.log(data.tracks.items.length);
    const updatedSearchTracks = [];
    data.tracks.items.map((track) => {
      updatedSearchTracks.push({
        key: track.id,
        SongName: track.name,
        ArtistName: track.artists[0].name,
        Action: "+",
        AlbumSrc: track.album.images[2].url,
        uri: track.uri 
      });
    });
    setSearchTracks(updatedSearchTracks);
  }
  
  const makePlaylist = async (e) => { 
    console.log(token);
    const {data} = await axios.post(`https://api.spotify.com/v1/users/${token}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { name: "My Playlist", public: false}
    });
    console.log(data);
    
    const playlistID = data.id;
  };
  
  
  function resetPlaylist() {
    makePlaylist();
    setPlaylistTracks([]);
  }


  return (
    <div className="App">
      <div className="follower"></div>
      <h1 className="Heading">Ja<span className="highlight">mmm</span>ing</h1>
      { !token ?
        <a href={auth}>
          <button className="Login">Login to Spotify</button>
        </a>
        : <><button className="Logout" onClick={logout}> Log-out </button>
          <SearchBar 
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            searchSongs={searchSongs}
          /></> 
      }
      
      <div className="content">
        <SearchResults
          searchTracks={searchTracks}
          onRemoveTrack={removeSearchTrack}
          onAddTrack={addPlaylistTrack}
        />
        <Playlist
          playlistTracks={playlistTracks}
          onRemoveTrack={removePlaylistTrack}
          onResetPlaylist={resetPlaylist}
        />
      </div>
    </div>
  );
}

export default App;
