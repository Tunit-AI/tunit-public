// import logo from './logo.svg';
// import './Navbar.css';
// import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';
import AddSong from './Pages/AddSong';
import Welcome from './Pages/Welcome/Welcome';
import Signup__Signin from './Components/Signup';

// import Welcome from './Pages/Welcome'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addSong" element={<AddSong />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<Signup__Signin />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    
    </>
  );
}

export default App;

