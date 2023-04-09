// import logo from './logo.svg';
// import './Navbar.css';
// import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';
import AddSong from './Pages/AddSong';
import Welcome from './Pages/Welcome/Welcome';
import Signup__Signin from './Components/SignUp_OLD/Signup';
import SignUpForm from './Components/SignUpForm';
import * as ROUTES from './Constants/routes';

// import Welcome from './Pages/Welcome'


const App = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.ADD_SONG} element={<AddSong />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpForm />} />
        <Route path={ROUTES.UNAUTHORIZED} element={<h1>404 Not Found</h1>} />

      </Routes>
    
    </>
  );
}

export default App;

