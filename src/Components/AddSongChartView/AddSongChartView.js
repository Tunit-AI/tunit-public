import React, { useState } from 'react';
// import css styles for album (implement from fuzz.css classes)
import './AddSongChartView.css';
import AddToLibrary from '../Spotify/AddToLibrary';
import SpotifyPlayer from '../Spotify/SpotifyPlayer'; 


const AddSongChartView = ({ recommendations }) => {
    // const localStorageItems = localStorage.getItem("recItem");
    // const itemsArray = JSON.parse(localStorageItems);
    const [selectedTrackId, setSelectedTrackId] = useState(null);

    const playSong = (trackId) => {
      setSelectedTrackId(trackId);
    };
    const accessToken = localStorage.getItem("access_token");
  
    return (
            <div className="containerASCV">
                <h1 className="titleASCV">Recommended Songs</h1>
                <ul className="cardsASCV">
                    {recommendations.map((item) => {
                        // eslint-disable-next-line
                        const cleanedArtists = item.artists.replace(/[\[\]']+/g, ""); // Remove brackets and quotes

                        return (
                            <li key={item.id} className="cardASCV">
                                <div className="card-itemASCV">
                                    <h2 className="card-itemASCV">{item.name}</h2>
                                    <h3 className="card-item-subtitleASCV">{cleanedArtists}</h3>
                                    <div className="card-content">
                                        <img
                                            className="card-imageASCV"
                                            src={item['album art']}
                                            alt="Album Art"
                                        />
                                    </div>
                                    <div className="card-rate-functionsASCV">
                                        {/* <i className="fa-solid fa-circle-play fa-2xl quick-actionsASCV"></i> */}
                                        <i
                                            className="fa-solid fa-circle-play fa-2xl quick-actionsASCV"
                                            onClick={() => playSong(item.id)} // Add the onClick handler
                                        ></i>

                                        {/* <i className="fa-solid fa-circle-plus fa-2xl quick-actionsASCV"></i> */}
                                        <AddToLibrary trackId={item.id} />
                                        <i className="fa-solid fa-heart fa-2xl quick-actionsASCV"></i>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {selectedTrackId && <SpotifyPlayer accessToken={accessToken} trackId={selectedTrackId} />}
            </div>
      );
}

export default AddSongChartView;