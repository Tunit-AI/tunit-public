import React, { useEffect, useState }  from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
// import useFetch from "react-fetch-hook";
import axios from "axios";
import SpotifyAuth from '../../Components/Spotify/SpotifyAuth';
import SpotifyGetPlaylists from '../../Components/Spotify/SpotifyGetPlaylists';
import './Profile.css';

//this function only for testing purposes; picks random user to show in page
function getRandomInt() {
    const min = 0;
    const max = 9;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}
function Profile() {

    const [user, setUser] = useState([]);

    const fetchData = () => {
        return axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => setUser(response.data));
    }

    useEffect(() => {
        fetchData();
    },[])

    // return (
    //     <main>
    //     <h1>User List</h1>
    //     <ul>
    //         {user && user.length > 0 && user.map((userObj, index) => (
    //             <li key={userObj.id}>{userObj.name}</li>
    //         ))}
    //     </ul>
    //     <p>
    //         {user && user.length > 0 && user.map((userObj, index) => (
    //             {userObj.id[0]}{userObj.name[}
    //         ))}
    //     </p>
    //     </main>
    // )
// }



    // will add ability to add photos if time allows
    const firstName ="John"
    const lastName ="Doe"
    const emailAddr ="johndoe@email.com"
    const authFormat = "Spotify"
    // function Profile() {
    const randomInt = getRandomInt();
    return (
        <>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <nav>
                <NavLink to="/">
                    <h2>
                        ← Home
                    </h2>
                </NavLink>
            </nav>
            <div>
                <p></p>
                <h3>Name</h3>
                {user && user.length > 0 && (
                    <p>{user[randomInt].name}</p>
                )}
                <br></br>
                <h3>Email</h3>
                {user && user.length > 0 && (
                    <p>{user[randomInt].email}</p>
                )}
                <br></br>
                {/* <h3>Privacy</h3> */}
                <br></br>
                <br></br>
                {/* <h4>Sign in with Spotify</h4> */}
                <SpotifyAuth />
                <SpotifyGetPlaylists />
                {/* <p>
                    Signed in with {authFormat}
                </p> */}
                <br>
                </br>
                {/* <button>
                    Deauth {authFormat}
                </button> */}
                <br>
                </br>
                {/* <button>
                    Delete Account
                </button> */}
            </div>
        </>
    )
}

export default Profile;