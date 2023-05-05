import React, { useEffect, useState } from 'react';
import querystring from 'query-string';
import { auth, db, collection, doc, setDoc, onAuthStateChanged, updateUserAndAddToCollection } from '../../Firebase/Config';

const CLIENT_ID = 'db991fb76b5e4a74a8dbdaa111fc0520';
const CLIENT_SECRET = 'b021b9d7b3ba441db90b34d1d80dc7f1';
const REDIRECT_URI = 'http://localhost:3000/profile';

const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const handleLogin = () => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const search = window.location.search;
          const params = querystring.parse(search);
          const code = params.code;
          const state = params.state;
    
          if (code && state) {
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
          .then(data => {
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);

            updateUserAndAddToCollection(user, accessToken, refreshToken);

          })
          .catch(err => console.error(err));
      }
    }
  });

  return () => {
    unsubscribe();
  };
}, []);  
  return (
    <div>
      {accessToken
        ? <p>Logged in successfully.</p>
        : <button onClick={handleLogin}>Login with Spotify</button>}
    </div>
  );
};

export default SpotifyAuth;
