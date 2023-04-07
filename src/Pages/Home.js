// import logo from './logo.svg';
import Navbar from '../Components/Navbar';
import MusicView from '../Components/MusicView';
import ChartView from '../Components/ChartView';



function Home() {
  return (
    <div className="App">
      <Navbar />
      <MusicView />
      <ChartView />
    </div>
  );
}

export default Home;

