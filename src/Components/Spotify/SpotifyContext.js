import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const SpotifyContext = createContext();

export const useSpotify = () => {
    return useContext(SpotifyContext);
};

export const SpotifyProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const value = {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
    };

    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        const fetchTokens = async () => {
          if (!user) return;
          
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            if (userData.accessToken && userData.refreshToken) {
              setAccessToken(userData.accessToken);
              setRefreshToken(userData.refreshToken);
            }
          }
        };
        
        fetchTokens();
      }, [user]);
    

    return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
};
