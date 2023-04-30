import Navbar from '../../Components/NavBar/Navbar';
import './AddSong.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";
import * as API from './Api/apiReference';

function AddSong() {

    const [songLink, setSongLink] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Send the song ID to the API and store the result in local storage
        const response = await fetch(`${API.TUNITAPI}/${songLink}`);    
        const data = await response.json();
        localStorage.setItem('recData', JSON.stringify(data));
        alert('Song data stored in local storage.');
      } catch (error) {
        console.error(error);
        alert('Error storing song data.');
      }
    };
  
    const handleInputChange = (e) => {
        setSongLink(e.target.value);
    };
        
        
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
    }, [user, loading]);
  
    return (
        <>
            <Navbar />
            <div className='addSong-container'>
                <br></br>
                <h1>Add Song</h1>
                <h2 className='addSong-h2'>
                    Type and select the name of your favorite song below and
                    we'll find the perfect recommendations for you!
                </h2>
                <br></br>
                <input className='input-addSong' placeholder='Flatbed Freestyle' />
                <button className='button-submit' type='submit' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    )
}

export default AddSong;