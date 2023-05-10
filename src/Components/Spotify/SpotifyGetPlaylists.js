import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Pages/Profile/Profile.css';
import { auth, db, updateUserAndAddToCollection, refreshAccessTokenAndSave } from "../../Firebase/Config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    // const [user, loading, error] = useAuthState(auth);

    const user = auth.currentUser; // Replace this with the actual user ID

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = localStorage.getItem("access_token");
                if (storedToken && storedToken.access_token) {
                    setToken(storedToken.access_token);
                } else {
                        if (user) {
                        const q = query(collection(db, "users"), where("uid", "==", user.uid));
                        const doc = await getDocs(q);
                        const fetchedToken = doc.docs[0].data().accessToken;
                        const fetchedRefreshToken = doc.docs[0].data().refreshToken; // Assuming refreshToken is stored in the user document
                        setToken(fetchedToken);
                        console.log("SGP: Refreshing access token...")
                        localStorage.setItem("access_token", fetchedToken);
                        localStorage.setItem("refresh_token", fetchedRefreshToken);

                    } else {
                        console.log("SGP: User not found.")
                    }
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred while fetching access token");
            }
        };
        if (user) {
            fetchToken();
        }
    }, [user]);


    const handleGetPlaylists = () => {
        if (!token) return;

        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);

            // If access token has expired, reauthenticate the user.
            if (error.response.status === 401) {
                // Redirect the user to the Spotify login page.
                // perform the refreshAccessTokenAndSave function
                console.log("Access token expired. Refreshing access token...");
                const storedTokenObject = JSON.parse(localStorage.getItem("token"));
                // Retrieving refresh_token
                const refreshToken = localStorage.getItem("refresh_token");
                refreshAccessTokenAndSave(user, refreshToken);
                
            }
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
