import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users" className={!currentUser ? 'disabled-link' : ''}>Users</Link></li>
        <li><Link to="/conferences" className={!currentUser ? 'disabled-link' : ''}>Conferences</Link></li>
        <li><Link to="/articles" className={!currentUser ? 'disabled-link' : ''}>Articles</Link></li>
        <li><Link to="/reviews" className={!currentUser ? 'disabled-link' : ''}>Reviews</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;