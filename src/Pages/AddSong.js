import Navbar from '../Components/NavBar/Navbar';
import '../Pages/Profile/Profile.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Config";

function AddSong() {

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
            <div>
                <br></br>
                <h1>Paste Song Below</h1>
                <br></br>
                <input className='input-addSong' placeholder='music.apple.com/songLink' />
                <button className='button-submit' type='submit'>
                    Submit
                </button>
            </div>
        </>
    )
}

export default AddSong;