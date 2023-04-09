import './Navbar.css';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuData } from './MenuData';

const NavBar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1 className="title">
        <i className="fa-solid fa-circle-play"></i> Tunit
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav__menu active' : 'nav__menu'}>
        {MenuData.map((item, index) => {
            if (location.pathname === item.path) {
                return null;
            }
          return (
            <li key={index}>
              <a href={item.path} className={item.cName}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            </li>
            
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;