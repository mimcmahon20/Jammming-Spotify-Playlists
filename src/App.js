import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import axios from 'axios';
import UsersTopTracks from './UsersTopTracks';

function App() {
  const CLIENT_ID = "8546073d8994458e920834495ed2eaea";
  const REDIRECT_URI = "https://647912ad52f124000828ad81--zippy-churros-8887e2.netlify.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [ token, setToken ] = useState(null);
  const [ userID, setUserID ] = useState(null);
  const [ topTrackOffset, setTopTrackOffset ] = useState(0);
  let time_range = "long_term";
  const LIMIT = 10;

  useEffect(() => { 
    const hash = window.location.hash
    let token = window.localStorage.getItem("token");
    if(!token && hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];
      window.localStorage.setItem("token", token);
      window.location.hash = "";
    }
    setToken(token);

    const getUserID = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserID(data.id);
    }

    const getTopSongs = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: { Authorization: `Bearer ${token}` },
        params: { time_range: time_range, limit: LIMIT }
      });
      const updatedTopTracks = [];
      data.items.forEach((track) => {
        updatedTopTracks.push({
          key: track.id,
          SongName: track.name,
          ArtistName: track.artists[0].name,
          Action: "+",
          AlbumSrc: track.album.images[2].url,
          uri: track.uri
        });
      });
      setTopTracks(updatedTopTracks);
    }  

    
    if(token) {
      getUserID();
      getTopSongs();
    }
  }, [token, userID, time_range]);



  const auth = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private playlist-modify-public user-top-read`;
  

  function logout() {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  const [searchKey, setSearchKey] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("The New Playlist");

  function removeSearchTrack(key) {
    const updatedSearchTracks = searchTracks.filter((track) => track.key !== key);
    setSearchTracks(updatedSearchTracks);
  }
  
  function removePlaylistTrack(key) {
    const updatedPlaylistTracks = playlistTracks.filter((track) => track.key !== key);
    setPlaylistTracks(updatedPlaylistTracks);
  }

  function removeTopTrack(key) {
    const updatedTopTracks = topTracks.filter((track) => track.key !== key);
    setTopTracks(updatedTopTracks);
  }

  function refreshTopTracks() {
    setTopTrackOffset(topTrackOffset >= 40 ? 0 : topTrackOffset + 10);
    const getTopSongs = async (topTrackOffset) => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: { Authorization: `Bearer ${token}` },
        params: { time_range: time_range, limit: LIMIT, offset: topTrackOffset }
      });
      const updatedTopTracks = [];
      data.items.forEach((track) => {
        updatedTopTracks.push({
          key: track.id,
          SongName: track.name,
          ArtistName: track.artists[0].name,
          Action: "+",
          AlbumSrc: track.album.images[2].url,
          uri: track.uri
        });
      });
      setTopTracks(updatedTopTracks);
    }
    getTopSongs(topTrackOffset);
  }

  function addPlaylistTrack(track) {
    const updatedPlaylistTracks = [...playlistTracks, track];
    setPlaylistTracks(updatedPlaylistTracks);
  }

  
  const searchSongs = async (e) => {
    e.preventDefault();
    const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${searchKey}&type=track`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: searchKey, type: "track", limit: LIMIT}
    });

    const updatedSearchTracks = [];
    data.tracks.items.forEach((track) => {
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
  
  const makePlaylist = async () => { 
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        public: false // Set to true if you want the playlist to be public
      })
  
    });

    if (response.ok) {
      const playlistData = await response.json();
      const playlistID = playlistData.id;

      let uris = [];
      playlistTracks.forEach((track) => {
        uris.push(`spotify:track:${track.key}`);
      });
      const secondResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: uris
        })
      });
      if(secondResponse.ok) {
        console.log("success");
      }
    } else {
      console.error('Failed to create playlist:', response.status, response.statusText);
    }

    
    //const playlistID = data.id;
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
          playlistName={playlistName}
          onRemoveTrack={removePlaylistTrack}
          onResetPlaylist={resetPlaylist}
          onChangePlaylistName={setPlaylistName}
        />
        <UsersTopTracks
          refreshTopTracks={refreshTopTracks}
          topTracks={topTracks}
          onRemoveTrack={removeTopTrack}
          onAddTrack={addPlaylistTrack}
        />
      </div>
    </div>
  );
}

export default App;
