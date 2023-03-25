import React, { useEffect, useState }  from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import '../css/Navbar.css'
import { NavLink } from 'react-router-dom';
// import useFetch from "react-fetch-hook";
import axios from "axios";

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
const authFormat = "Apple Music"
// function Profile() {

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
            <VStack>
                <p></p>
                <h3>Name</h3>
                {user && user.length > 0 && (
                    <p>{user[0].name}</p>
                )}
                <br></br>
                <h3>Email</h3>
                {user && user.length > 0 && (
                    <p>{user[0].email}</p>
                )}
                <br></br>
                <h3>Privacy</h3>
                <p>
                    Signed in with {authFormat}
                </p>
                <br>
                </br>
                <button>
                    Deauth {authFormat}
                </button>
                <br>
                </br>
                <button>
                    Delete Account
                </button>
            </VStack>
        </>
    )
}

export default Profile;