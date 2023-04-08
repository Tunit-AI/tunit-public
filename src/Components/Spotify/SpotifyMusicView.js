import React, { useState, useEffect } from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import axios from 'axios';
// import css styles for album (implement from fuzz.css classes)
import './MusicView.css';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyMusicView = () => {

    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setToken(localStorage.getItem("access_token"));
        }

        const handleGetPlaylists = async () => {
            try {
                const response = await axios.get(PLAYLISTS_ENDPOINT, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setData(response.data);
                // localStorage.setItem('playlistData', JSON.stringify(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        handleGetPlaylists();
    }, []);
    console.log("error message reason:");

    console.log(typeof data);
    // const playlistData = JSON.parse(localStorage.getItem('playlistData'));

    return (
        <>
            <div className="container">
                <h1 className="titleSpotify">Spotify Playlists</h1>
                <ul className="cards">
                {data && data.items && Object.values(data.items).map((item, index) => {
    return (
        <li key={index} className='card'>
        <div className='card-item'>
            <h3 className='card-item'>{item.name}</h3>    
            {/* <h4 className='card-item-subtitle'>{item.artist}</h4> */}
            <div className='card-content'>
            {item?.images && item.images.length > 0 && item.images[0].url ? <img src={item.images[0].url} /> : null}                
            </div>
            <div className='card-rate-functions'>
            <i className="fa-solid fa-circle-play">
                {/* {Play} */}
            </i> 
            <i className="fa-solid fa-circle-plus">
                {/* {Add} */}
            </i> 
            <i className="fa-solid fa-heart">
                {/* {Add} */}
            </i> 
            </div>
        </div>
        </li>
    );
    })}
                </ul>
            </div>
        </>

    )
}      

function AddMusicItems() {
    return (
        <ul>
            
        </ul>
    )
}

export default SpotifyMusicView;