import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/conferences">Conferences</Link></li>
      <li><Link to="/articles">Articles</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
    </ul>
  </nav>
);

export default Navbar;