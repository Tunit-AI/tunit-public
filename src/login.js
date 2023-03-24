import React from 'react';
import axios from 'axios';

const login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState()

    const  handleSubmit = async e => {

    };

    // if user is logged in, print message
    if (user) {
        return <div>{user.name} is logged in</div>;
    }

    // else show login
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                value={username}
                placeholder="Enter a username: "
                onChange={({ target }) => setUsername(target.value)}
            />
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter a password: "
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    );
};
export default login;