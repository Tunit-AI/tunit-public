import React, { useEffect } from 'react';
import querystring from 'query-string';
import { auth, updateUserAndAddToCollection, db, doc, getDoc } from '../../Firebase/Config';
import { useAuthState } from "react-firebase-hooks/auth";
import { useSpotify } from './SpotifyContext';

const CLIENT_ID = 'db991fb76b5e4a74a8dbdaa111fc0520';
const CLIENT_SECRET = 'b021b9d7b3ba441db90b34d1d80dc7f1';
// const REDIRECT_URI = 'http://localhost:3000/profile';
const REDIRECT_URI = 'https://tunit.cloud/profile';

const SpotifyAuth = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useSpotify();

    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

  const handleLogin = () => {
    const user = auth.currentUser;
    if (!user) {
        alert('Please log in before connecting to Spotify.');
        return;
    }

    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const url = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      });

    window.location.href = url;
  };
  
  const [user] = useAuthState(auth);
  useEffect(() => {
    // const user = auth.currentUser;
    if (user) {
        const search = window.location.search;
        const params = querystring.parse(search);
        const code = params.code;
        const stateParam = params.state;
    
        if (code && stateParam) {
            const authOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: querystring.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI
                })
            };
  
            fetch('https://accounts.spotify.com/api/token', authOptions)
                .then(response => response.json())
                .then(async data => {
                    const accessToken = data.access_token;
                    const refreshToken = data.refresh_token;
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
        
                    await updateUserAndAddToCollection("Spotify", user, accessToken, refreshToken);
                })
                .catch(err => console.error(err));
        }
    }
  }, [user]);

    // useEffect(() => {
    //     const fetchTokens = async () => {
    //         if (!user) return;
            
    //         const userDocRef = doc(db, "users", user.uid);
    //         const userDocSnap = await getDoc(userDocRef);
            
    //         if (userDocSnap.exists()) {
    //             const userData = userDocSnap.data();
                
    //             if (userData.accessToken && userData.refreshToken) {
    //                 setAccessToken(userData.accessToken);
    //                 setRefreshToken(userData.refreshToken);
    //             }
    //         }
    //     };
    
    //     fetchTokens();
    // }, [user]);


  return (
    <div>
        {accessToken
            ? <p>Logged in successfully.</p>
            : <button onClick={handleLogin}>Login with Spotify</button>}
    </div>
  );
};

export default SpotifyAuth;
