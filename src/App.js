// import logo from './logo.svg';
// import './Navbar.css';
// import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import AddSong from './Pages/AddSong';
import Welcome from './Pages/Welcome';
import Signup__Signin from './Components/Signup';

// import Welcome from './Pages/Welcome'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

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

