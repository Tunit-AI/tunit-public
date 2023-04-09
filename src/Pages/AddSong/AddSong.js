import Navbar from '../../Components/NavBar/Navbar';
import './AddSong.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";

function AddSong() {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('This feature is not available yet');
    }
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