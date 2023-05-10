import React, { useEffect, useState } from 'react';

function SpotifyPlayer({ accessToken, trackId }) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);


  useEffect(() => {
    if (!accessToken || player) return;

    // Ensure the SDK is ready before creating the player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'Tunit',
        getOAuthToken: cb => { cb(accessToken); },
      });
      
      // Error handling
      newPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
      newPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
      newPlayer.addListener('account_error', ({ message }) => { console.error(message); });
      newPlayer.addListener('playback_error', ({ message }) => { console.error(message); });
  
      // Playback status updates
      newPlayer.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      // Not Ready
      newPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setDeviceId(null);
      });

      newPlayer.connect();
      setPlayer(newPlayer);
    };
    
    // Load the SDK
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
    scriptTag.async = true;
    document.body.appendChild(scriptTag);
    
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [accessToken, player]);

  useEffect(() => {
    if (!player || !deviceId || !trackId) return;

    player._options.getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  }, [player, deviceId, trackId]);

  
  
  return null;
}

export default SpotifyPlayer;
