// import logo from './logo.svg';
import Navbar from '../../Components/NavBar/Navbar';
import SpotifyMusicView from '../../Components/Spotify/SpotifyMusicView';
import ChartView from '../../Components/ChartView/ChartView';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";


function Home() {
  const hasAccessToken = !!localStorage.getItem("access_token");

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="App">

      {/* Website Navbar */}
      <Navbar />

      {/* Recommendation View */}


      {/* Billboard View */}
      <ChartView />
    </div>
  );
}

export default Home;

