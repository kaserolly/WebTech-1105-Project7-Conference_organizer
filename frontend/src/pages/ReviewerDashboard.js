import React, { useEffect, useState } from 'react';
import { fetchArticles, reviewArticle } from '../api/articleApi';
import './ReviewerDashboard.css';

const ReviewerDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };

    fetchAllArticles();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (selectedArticle) {
      await reviewArticle(selectedArticle.id, { reviewContent });
      setArticles(articles.map(article => (article.id === selectedArticle.id ? { ...article, reviewContent } : article)));
      setSelectedArticle(null);
      setReviewContent('');
    }
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setReviewContent(article.reviewContent || '');
  };

  return (
    <div className="reviewer-dashboard">
      <h1>Reviewer Dashboard</h1>
      <h2>Articles to Review</h2>
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <button onClick={() => handleSelectArticle(article)}>Review</button>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <form onSubmit={handleReviewSubmit} className="review-form">
          <h2>Review Article: {selectedArticle.title}</h2>
          <div className="form-group">
            <label>Review:</label>
            <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default ReviewerDashboard;