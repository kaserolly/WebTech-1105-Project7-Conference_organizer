import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage';
import ConferencesPage from '../pages/ConferencesPage';
import ArticlesPage from '../pages/ArticlesPage';
import ReviewerDashboard from '../pages/ReviewerDashboard';
import LoginPage from '../pages/LoginPage';
import { UserProvider } from '../context/UserContext'; // Import UserProvider

const App = () => (
  <UserProvider>
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/reviews" element={<ReviewerDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </UserProvider>
);

export default App;
export const API_BASE_URL = 'http://localhost:3001';