import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Assuming you have a UserContext
import './LoginPage.css';
import { API_BASE_URL } from '../api/api'; // Import the API base URL

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext); // Get setCurrentUser from context

  const handleLogin = async (e) => {
    e.preventDefault();
    // Hardcoded password for demonstration purposes
    const hardcodedPassword = 'password';

    if (password === hardcodedPassword) {
      try {
        const response = await fetch(`${API_BASE_URL}/users?username=${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }

        const user = await response.json();
        setCurrentUser(user); // Set the current user in context

        // Redirect based on user role
        switch (user.role.toLowerCase()) {
          case 'admin':
            navigate('/users');
            break;
          case 'organizer':
            navigate('/conferences');
            break;
          case 'author':
            navigate('/articles');
            break;
          case 'reviewer':
            navigate('/reviews');
            break;
          default:
            navigate('/');
            break;
        }
      } catch (error) {
        setError('Invalid username or password');
      }
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;