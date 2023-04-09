import React, { useEffect } from "react";
import "./MusicKit";
import MusicKit from "./MusicKit";
import MusicAuth from "./MusicAuth";

function AppleMusic() {
  return (
    <div>
        <MusicKit />
        <MusicAuth />
        <button className='button-red' id='AM-login-btn'> Connect Apple Music </button>
    </div>
  );
}

export default AppleMusic;