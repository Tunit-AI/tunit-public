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
    
    const loadData = async () => {
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
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleOnChange = (e) => {
        setQuery(e.target.value);
        setShowResults(true);
    };

    const expandInput = () => {
        setMinimizeInput(false);
    };

    const fetchRecommendations = async (songId) => {
        setIsLoading(true);
        setShowResults(false);
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
                {isLoading && <div>Loading recommendations...</div>}
                {recResults && (
                    <AddSongChartView
                        recommendations={recommendations}                        
                    />
                )}
            </div>
        </>
    );
}

export default RecSearch;
