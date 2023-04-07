import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Signup__Signin = () => {
  
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (isSignIn) {
      // Handle login logic here
      try {
        const response = await axios.post('http://192.168.1.127:8090/api/accounts', { email, password });
        console.log('User logged in successfully:', response.data);
      } catch (error) {
        console.error('Failed to log in:', error);
      }
    } else {
      // Handle sign-up logic here
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
        const response = await axios.post('http://192.168.1.127:8090/api/accounts', { email, password });
        console.log('User signed up successfully:', response.data);
      } catch (error) {
        console.error('Failed to sign up:', error);
      }
    }
 };

  return (
    <>
    <section className='welcome--bg'>
    <div className='form-box'>
        <div className='form-value'>
          {/* <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1> */}
            <form onSubmit={handleSubmit}>
              <div className='inputbox'>
              <h2>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </h2>
              </div>
              <div className='inputbox'>
              <h2>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </h2>
              </div>
              {!isSignIn && (
                <div className='inputbox'>
                <h2>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </h2>
                </div>
              )}
              <NavLink to='/forget' className='forget navWelcome'>{isSignIn ? 'Forget your password?' : ''}</NavLink>

              <button className='register' type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>

            </form>
          <button className='register' onClick={() => setIsSignIn((prevState) => !prevState)}>
            {isSignIn ? 'Sign Up Instead' : 'Sign In Instead'}
          </button>
          
        </div>
      </div>
    </section>
    </>
  );
};

export default Signup__Signin;