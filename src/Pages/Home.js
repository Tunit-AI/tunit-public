// import logo from './logo.svg';
import Navbar from '../Components/Navbar';
import SpotifyMusicView from '../Components/Spotify/SpotifyMusicView';
import ChartView from '../Components/ChartView';


function Home() {
  const hasAccessToken = !!localStorage.getItem("access_token");

  return (
    <div className="App">
      <Navbar />
      {/* {hasAccessToken && <SpotifyMusicView />} */}
      <ChartView />
    </div>
  );
}

export default Home;

