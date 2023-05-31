import React from "react";
import "./SearchBar.css";

function SearchBar(props) {

    return (
        <form className="SearchBar" onSubmit = {props.searchSongs}>
            <input className="Bar" placeholder="Enter A Song, Album, or Artist" type="text"
            onChange={(e) => props.setSearchKey(e.target.value)}
            />
            <button className="SearchButton"> {">"} </button>
        </form>
    ); 
}

export default SearchBar;