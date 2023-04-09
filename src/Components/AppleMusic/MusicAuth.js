import React, { useEffect } from "react";
import MusicKit from "./MusicKit";
import * as TOKENS from "./dev/AM_tokens";


function MusicAuth() {
    useEffect(() => {
      const onMusicKitLoaded = () => {
        // MusicKit global is now defined
        window.MusicKit.configure({
          developerToken: TOKENS.JWT,
          app: {
            name: TOKENS.NAME,
            build: TOKENS.BUILD
          }
        });
  
        const music = window.MusicKit.getInstance();
        const loginBtn = document.getElementById('AM-login-btn');
        
        loginBtn.addEventListener('click', () => {
          music.authorize().then(function(token) {
            // do something with token here
            window.location.href += "?music-user-token=" + encodeURIComponent(token);
          }).catch(e => {
            console.log('Error: ' + e);
          });
        });
      };
  
      if (window.MusicKit) {
        onMusicKitLoaded();
      } else {
        document.addEventListener('musickitloaded', onMusicKitLoaded);
      }
  
      return () => {
        document.removeEventListener('musickitloaded', onMusicKitLoaded);
      };
    }, []);
  
    return null;
  }

export default MusicAuth;