import React from 'react';
import './Welcome.css';
import Signup__Signin from '../../Components/Signup';
function Welcome() {
    return (
        <>
            <div className='welcome--bg'>
                {/* <h1 className='welcome-title'>Welcome to Tunit</h1> */}
                <Signup__Signin />
            </div>
        </>
    )
}

export default Welcome;