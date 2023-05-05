import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, logInWithEmailAndPassword, signInWithGoogle, refreshAccessTokenAndSave } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import "./Login.css";

async function handleEmailLogin(email, password) {
    const userCredential = await logInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
        // Check if the user has access and refresh tokens stored in their document
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            if (userData.accessToken && userData.refreshToken) {
                await refreshAccessTokenAndSave(user, userData.refreshToken);
            }
        }
    }
}
async function handleGoogleLogin() {
    const userCredential = await signInWithGoogle();
    const user = userCredential.user;

    if (user) {
    // Check if the user has access and refresh tokens stored in their document
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

            if (userData.accessToken && userData.refreshToken) {
                await refreshAccessTokenAndSave(user, userData.refreshToken);
            }
        }
    }
}


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
    }, [user, loading]);
    return (
        <>
            <div className="login__title">
                <h1>Welcome to Tunit</h1>
            </div>
            <div className="login welcome__bg">
                <div className="login__container">
                    <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    />

                    <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    />
                    
                    <button
                    className="login__btn login__std"
                    onClick={() => handleEmailLogin(email, password)}>
                        Login
                    </button>

                    <button 
                    className="login__btn login__google" 
                    onClick={handleGoogleLogin}>
                        Login with Google
                    </button>

                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account? 
                        <Link to="/register">
                            Register
                        </Link> 
                            now.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;