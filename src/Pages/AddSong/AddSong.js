import Navbar from '../../Components/NavBar/Navbar';
import './AddSong.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";
// import * as API from './Api/apiReference';
import RecSearch from '../../Components/RecSearch';

function AddSong() {
  
    // const [songID, setSongLink] = useState('');
    // const tempID = '7lmeHLHBe4nmXzuXc0HDjk';
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const input = document.querySelector('.input-addSong').value;
    //       const response = await fetch(`${API.TUNITAPI}/${input}`);
    //       const data = await response.json();
    //       console.log(data);
    //       localStorage.setItem("recItem", JSON.stringify(data));
    //       // Use the data to set the song ID state or do any other operations
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    
    // eslint-disable-next-line
    const [user, loading, error] = useAuthState(auth);
    // eslint-disable-next-line
    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      // eslint-disable-next-line
    }, [user, loading]);
  
    
    return (
        <div className='addSong'>
            <Navbar />
            <div className='addSong-container index'>
                {/* <br></br>
                <h1>Add Song</h1>
                <h2 className='addSong-h2'>
                    Type and select the name of your favorite song below and
                    we'll find the perfect recommendations for you!
                </h2>
                <br></br> */}
                <RecSearch />
            </div>
        </div>
    )
}

export default AddSong;