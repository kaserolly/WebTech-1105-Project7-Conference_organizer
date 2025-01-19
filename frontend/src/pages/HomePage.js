import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming you have a UserContext
import './HomePage.css';
import corgiImage from './corgi.jpg'; // Updated path to the image

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get currentUser and setCurrentUser from context

  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleLogout = () => {
    setCurrentUser(null); // Clear the current user
    navigate('/login'); // Redirect to the login page
  };

  const handleRedirect = () => {
    if (currentUser) {
      if (currentUser.type === 'reviewer') {
        navigate('/reviews');
      } else if (currentUser.type === 'author') {
        navigate('/articles');
      } else if (currentUser.type === 'organizer') {
        navigate('/conferences');
      } else if (currentUser.type === 'admin') {
        navigate('/users');
      } else {
        navigate('/');
      }
    } else {
      handleLogin();
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to CORGi</h1>
      <p>The Conference ORGanizer, not the dog.</p>
      <p>This is the homepage. Please login to access more features.</p>
      <div className="content">
        <img src={corgiImage} alt="Corgi" />
        <div className="buttons">
          <button className="styled-button" onClick={handleRedirect}>LOGIN</button>
          {currentUser && <button className="styled-button" onClick={handleLogout}>LOGOUT</button>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;