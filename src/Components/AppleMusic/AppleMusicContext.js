import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const AppleMusicContext = createContext();

export const useAppleMusic = () => {
    return useContext(AppleMusicContext);
};

export const AppleMusicProvider = ({ children }) => {
    const [AppleMusicToken, setAppleMusicToken] = useState(null);

    const value = {
        AppleMusicToken,
        setAppleMusicToken,
    };

    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        const fetchAppleMusicTokenToken = async () => {
          if (!user) return;
          
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            if (userData.AppleMusicToken) {
              setAppleMusicToken(userData.AppleMusicToken);
            }
          }
        };
        
        fetchAppleMusicTokenToken();
      }, [user]);
    

    return <AppleMusicContext.Provider value={value}>{children}</AppleMusicContext.Provider>;
};
