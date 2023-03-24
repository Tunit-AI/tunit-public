import '../css/Navbar.css';
import React, {Component} from 'react';
import placeholder from '.././images/person.crop.circle.svg'
import add from '.././images/plus.app.svg'
import { Stack, HStack } from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom';
// import { Stack, HStack, VStack } from '@chakra-ui/react'

function Navbar(props) {

    const location = useLocation();
    return (
        <HStack className='container'>
            <nav>
                <NavLink to="/">
                    {location.pathname !== '/' && (
                        <h2>← Home</h2>
                    
                    )}
                    <h2>
                        {props.header}
                    </h2>

                </NavLink>
            </nav>           
            <nav>
                {location.pathname !== '/addSong' && (
                <NavLink to='/addSong'>
                    <img alt='' className='resize' src={add} />
                </NavLink>
                )}
                {location.pathname !== '/profile' && (
                <NavLink to='/profile'>
                    <img alt='' className='resize' src={placeholder} />
                </NavLink>
                )}
            </nav>        
        </HStack>
    )
    
}

export default Navbar;