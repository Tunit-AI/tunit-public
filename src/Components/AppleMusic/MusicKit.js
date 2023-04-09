import React, { useEffect } from "react";

function MusicKit() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default MusicKit;