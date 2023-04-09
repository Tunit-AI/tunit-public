// import logo from './logo.svg';
// import './Navbar.css';
// import Navbar from './Navbar';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';
import AddSong from './Pages/AddSong';
import Login from './Pages/Login';
import Register from './Pages/Register';
// import Dashboard from './Pages/Dashboard';
import Reset from './Pages/Reset';
import * as ROUTES from './Constants/routes';

// import Welcome from './Pages/Welcome'


const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> */}
        <Route path={ROUTES.RESET} element={<Reset />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.ADD_SONG} element={<AddSong />} />
        <Route path={ROUTES.UNAUTHORIZED} element={
          <>
            <h1>404 Not Found</h1>
            <h3><Link to="/">Return home</Link></h3>
          </>
        } />

      </Routes>
    
    </>
  );
}

export default App;

