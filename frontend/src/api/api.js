import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage';
import ConferencesPage from '../pages/ConferencesPage';
import ArticlesPage from '../pages/ArticlesPage';
import ReviewerDashboard from '../pages/ReviewerDashboard';
import Footer from '../components/Footer';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/conferences" element={<ConferencesPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/reviews" element={<ReviewerDashboard />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
export const API_BASE_URL = 'http://localhost:3001';