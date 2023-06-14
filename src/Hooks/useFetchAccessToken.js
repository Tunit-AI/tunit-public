import { useState, useEffect } from "react";
import { db } from "../Firebase/Config"; // Import your firestore instance

const useFetchAccessToken = (userId) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const unsubscribe = db
            .collection("users")
            .doc(userId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.spotifyAccessToken) {
                        setToken(data.spotifyAccessToken);
                        localStorage.setItem("access_token", data.spotifyAccessToken);
                    } else {
                        localStorage.removeItem("access_token");
                    }
                }
            });

        return () => unsubscribe();
    }, [userId]);

    return token;
};

export default useFetchAccessToken;
