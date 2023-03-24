// import logo from './logo.svg';
import Navbar from '../Components/Navbar';
import MusicView from '../Components/MusicView';



function Home() {
  return (
    <div className="App">
      <Navbar header="Today's Recommendations" />
      <MusicView />

    </div>
  );
}

export default Home;

