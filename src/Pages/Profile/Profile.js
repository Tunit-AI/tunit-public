import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import AppleMusic from '../../Components/AppleMusic/AppleMusic';
import SpotifyAuth from '../../Components/Spotify/SpotifyAuth';
import SpotifyGetPlaylists from '../../Components/Spotify/SpotifyGetPlaylists';
import './Profile.css';
import NavBar from '../../Components/NavBar/Navbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../Firebase/Config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useSpotify } from "../../Components/Spotify/SpotifyContext";

function Profile () {

    // spotify and AM Token context

    const { accessToken } = useSpotify();
  
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [localStorageToken, setLocalStorageToken] = useState(null);

    useEffect(() => {
        setLocalStorageToken(localStorage.getItem('access_token'));
    }, []);

    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading, accessToken]);
    
    return (
        <div className='profile-margin'>
            <NavBar />
            <div className='profile-content'>
                <h1>Name</h1>
                <p>{name}</p>
                
                <h1>Email</h1>

                <p>{user?.email}</p>

                <p className='profile-reset-password'><Link to="/reset"> Reset Password</Link></p>


            </div>
            <div className='Actions'>
                <button className='button-general' onClick={logout}> Logout </button>
                {localStorageToken ? <h3 className='h3-loggedin'>Logged in with Spotify</h3> : <SpotifyAuth />}
                <AppleMusic />
                
              <div className='dev-actions'>
                <h1 className='profile-dev'>DEV:</h1>
                <SpotifyGetPlaylists />
              </div>
            </div>

        </div>
    
    )
    
}

export default Profile;