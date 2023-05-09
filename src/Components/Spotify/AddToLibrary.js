import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db, refreshAccessTokenAndSave } from "../../Firebase/Config";
import { query, collection, getDocs, where } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";

const SAVE_TRACK_ENDPOINT = "https://api.spotify.com/v1/me/tracks";

const AddToLibrary = ({ trackId }) => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [isAdded, setIsAdded] = useState(false);
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
    const handleAddToLibrary = () => {
        if (!token || !trackId) return;

        axios.put(`${SAVE_TRACK_ENDPOINT}?ids=${trackId}`, null, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            setIsAdded(true);
            console.log("Song saved successfully!"); 
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
                const refreshToken = storedTokenObject.refresh_token;
                refreshAccessTokenAndSave(user, refreshToken);
                
            }
        });
    };

    return(
        <>
        {!isAdded 
            ? <i className="fa-solid fa-circle-plus fa-2xl quick-actionsASCV" onClick={handleAddToLibrary}></i> 
            : <i className="fa-solid fa-circle-check fa-2xl quick-actionsASCV"></i>}
        {/* {data && console.log('song saved succesfully')} */}
        </>
    );
}

export default AddToLibrary;
