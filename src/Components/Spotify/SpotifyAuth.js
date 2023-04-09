import React, { useEffect, useState }  from 'react';
import { NavLink } from 'react-router-dom';
// import useFetch from "react-fetch-hook";
import axios from "axios";
import SpotifyGetPlaylists from './SpotifyGetPlaylists';
import '../../Pages/Profile/Profile.css';
// SPOTIFY LOGIN

const CLIENT_ID = "db991fb76b5e4a74a8dbdaa111fc0520";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

// Update this to http://localhost:3000/profile when TESTING!!!
const REDIRECT_URL_AFTER_LOGIN = "https://tunit.cloud/profile";
const SPACE_DELIMITER = "%20";
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state'];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUp;

}
const SpotifyAuth = () => {
    useEffect(() => {
        if(window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type,
            } = getReturnParamsFromSpotifyAuth(window.location.hash);
            localStorage.clear();
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("expires_in", expires_in);
            localStorage.setItem("token_type", token_type);
        }
    })
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };
    return (
        <>
            <button id='#spotify_login_button' className="button-green" onClick={handleLogin}>Login to Spotify</button>
        </>
    )
}

export default SpotifyAuth;