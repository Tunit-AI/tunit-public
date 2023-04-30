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
        // Send the song link to the API and store the result in local storage
        const response = await fetch(API.TUNITAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ songLink })
        });
        const data = await response.json();
        localStorage.setItem('songData', JSON.stringify(data));
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
                <h1>Paste Song Below</h1>
                <br></br>
                <input className='input-addSong' placeholder='music.apple.com/songLink' />
                <button className='button-submit' type='submit' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    )
}

export default AddSong;