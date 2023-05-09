import React, { useEffect } from "react";
import MusicKit from "./MusicKit";
import * as TOKENS from "./dev/AM_tokens";
import { updateUserAndAddToCollection, auth } from "../../Firebase/Config";
import { useAppleMusic } from "./AppleMusicContext";

const user = auth.currentUser;

function MusicAuth() {

    const { AppleMusicToken, setAppleMusicToken } = useAppleMusic();

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
          music
            .authorize()
            .then(function(token) {

                // Store the token in localStorage
                localStorage.setItem("AppleMusicToken", token);

                window.location.href += "?music-user-token=" + encodeURIComponent(token);
                return token;
            })
            .then(async () => {
                // save to firebase
                const AppleMusicToken = localStorage.getItem("AppleMusicToken");
                setAppleMusicToken(AppleMusicToken);
                await updateUserAndAddToCollection("AppleMusic", user, AppleMusicToken);
                console.log("Apple Music token saved to Firebase.")
            })

          .catch(e => {
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