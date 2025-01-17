import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import ConferencesPage from './pages/ConferencesPage';
import ArticlesPage from './pages/ArticlesPage';
import ReviewerDashboard from './pages/ReviewerDashboard';
import Footer from './components/Footer';
import './App.css';

const App = () => (
  <Router>
    <Navbar />
    <div className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/conferences" element={<ConferencesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/reviews" element={<ReviewerDashboard />} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default App;