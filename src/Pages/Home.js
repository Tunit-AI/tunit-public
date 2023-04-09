// import logo from './logo.svg';
import Navbar from '../Components/NavBar/Navbar';
import SpotifyMusicView from '../Components/Spotify/SpotifyMusicView';
import ChartView from '../Components/ChartView/ChartView';


function Home() {
  const hasAccessToken = !!localStorage.getItem("access_token");

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

