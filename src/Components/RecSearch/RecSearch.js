import { useState, useEffect } from 'react';
import "./RecSearch.css";
import Papa from 'papaparse';

function RecSearch() {
    const [query, setQuery] = useState("");
    const [apiQuery, setApiQuery] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
    };

    return (
        <div className="rec-search-container">
            <input 
                className="input-addSong"
                onChange={handleOnChange}
                value={query}
                placeholder="Search for a song" 
            />
            {filteredData.length > 0 && query.length > 0 && (
                <div className='search-results'>
                    <ul>
                        {filteredData.map((item, index) => {
                          const cleanedArtists = item.artists.replace(/[\[\]']+/g, ""); // Remove brackets and quotes
                          return (
                            <li key={index}>
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
    );
}

export default RecSearch;
