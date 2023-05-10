import { useState, useEffect } from 'react';
import "./RecSearch.css";
import Papa from 'papaparse';
import AddSongChartView from '../AddSongChartView/AddSongChartView';

function RecSearch() {
    const [query, setQuery] = useState("");
    const [apiQuery, setApiQuery] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]); // [ {name: "song name", artists: "artist name", album: "album name"}, ...
    const [recResults, setRecResults] = useState(false);
    const [minimizeInput, setMinimizeInput] = useState(false);
    const [inputClicked, setInputClicked] = useState(false); // new state variable to keep track of whether the input box is clicked or not

    // http://35.235.122.79:3000/search?q=frank
    // fetch a url with a query parameter

    const loadData = async () => {
        // change to parse github binary instead
        Papa.parse("/RecSearch.csv", {
            header: true,
            download: true,
            complete: (results) => {
                setData(results.data);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (apiQuery) {
            const searchResults = data.filter(d => {
                const combinedData = `${d.name} ${d.album} ${d.artists}`.toLowerCase();
                return combinedData.includes(apiQuery.toLowerCase());
            });
            setFilteredData(searchResults);
        } else {
            setFilteredData([]);
        }
    }, [apiQuery, data]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setApiQuery(query);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleOnChange = (e) => {
        setQuery(e.target.value);
        setShowResults(true);
    };

    const expandInput = () => {
        if (!inputClicked) {
            setInputClicked(true);
        }
        setMinimizeInput(false);
    
    };

    const fetchRecommendations = async (songId) => {
        setIsLoading(true);
        setShowResults(false);
        if (!inputClicked) {
            setInputClicked(true);
        }
        setMinimizeInput(true);

        try {
            const response = await fetch(`https://tunitapirec.herokuapp.com/api/song/${songId}`);
            const recommendations = await response.json();
            console.log(recommendations);
            setRecommendations(recommendations);

        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
            setRecResults(true);
        }
    };
    const searchContainerStyle = recResults
    ? { position: "relative", top: "0", left: "0", transform: "none" }
    : { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };


    return (
        <>
            {inputClicked ? null : (
                <div>
                <h1 className='recsearch-div'>Recommendations</h1>
                <h2 className="addSong-h2">
                    Type and select the name of your favorite song below and we'll find the perfect recommendations for you!
                </h2>
                </div>
            )}
            <div className="rec-search-container" style={searchContainerStyle}>
                <input 
                    className={`input-addSong ${minimizeInput ? "minimized" : ""}`}
                    onChange={handleOnChange}
                    onClick={minimizeInput ? expandInput : null}
                    value={query}
                    placeholder="Search for a song" 
                />
                <div className={`search-results-container ${minimizeInput ? "" : "centered"}`}>
                    {showResults && filteredData.length > 0 && query.length > 0 && (
                        <div className='search-results'>
                            <ul>
                                {filteredData.map((item, index) => {
                                    // eslint-disable-next-line
                                    const cleanedArtists = item.artists.replace(/[\[\]']+/g, ""); // Remove brackets and quotes
                                    return (
                                        <li key={index} onClick={() => fetchRecommendations(item.id)}>
                                            <div>Song: {item.name}</div>
                                            <div>Artist: {cleanedArtists}</div>
                                            <div>Album: {item.album}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="recommendations-container">
                {isLoading && <div className='custom-loader'></div>}
                {recResults && (
                    <AddSongChartView
                        recommendations={recommendations}                        
                    />
                )}
            </div>
            <div className="help-button" onClick={() => {
                alert('FAQ\n\nA Spotify Premium Account is required to play music.\n\nIf you have issues getting a song to play, ensure Spotify is open on any of your devices, and then try playing a song from this page again.\n\nIf you encounter any errors on this page, reauthenticate your spotify account on the profile page, and then try again here.\n\nIf you still encounter errors, please contact us at help@tunit.cloud for further assistance.')}
            }>
            <i className="fa-solid fa-circle-question fa-2xl quick-actionsASCV"></i>
            </div>

        </>
    );
}

export default RecSearch;
