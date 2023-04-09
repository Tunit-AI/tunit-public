import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Pages/Profile/Profile.css';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setToken(localStorage.getItem("access_token"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            setData(response.data);
            // const playlistData = JSON.parse(localStorage.getItem('playlistData'));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return(
        <>
            <button className="button-black" onClick={handleGetPlaylists}>Spotify Authorization Load Check</button>
            {data?.items ? data.items.map((item) => (
                <>
                    <p>{item.name}</p>
                    <a href={item.external_urls.spotify}>View on Spotify</a>
                    
                    {item?.images && item.images.length > 0 && item.images[0].url ? <img src={item.images[0].url} /> : null}                
                </>
            ))  : null}
        </>
    );
}

export default SpotifyGetPlaylists;