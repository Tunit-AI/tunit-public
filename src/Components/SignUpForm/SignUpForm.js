import React, { useState } from "react";
import './SignUpForm.css';
const SignUpForm = () => { 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    return (
        <div className="sign-up-div">
            <h1>Sign Up</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}    
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <label htmlFor="password2">Confirm Password</label>
                <input 
                    type="password" 
                    name="password2" 
                    id="password2" 
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;