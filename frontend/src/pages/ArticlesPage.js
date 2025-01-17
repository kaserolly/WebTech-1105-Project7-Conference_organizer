import React, { useEffect, useState } from 'react';
import { fetchArticles, createArticle, deleteArticle, resubmitArticle } from '../api/articleApi';
import { fetchConferences } from '../api/conferenceApi';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [conferenceId, setConferenceId] = useState('');
  const [conferences, setConferences] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };

    const fetchAllConferences = async () => {
      const data = await fetchConferences();
      setConferences(data);
    };

    fetchAllArticles();
    fetchAllConferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = { title, content, conferenceId };
    if (editingArticle) {
      await resubmitArticle(editingArticle.id, articleData);
      setArticles(articles.map(article => (article.id === editingArticle.id ? { ...article, ...articleData } : article)));
      setEditingArticle(null);
    } else {
      const newArticle = await createArticle(articleData);
      setArticles([...articles, newArticle]);
    }
    setTitle('');
    setContent('');
    setConferenceId('');
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setConferenceId(article.conferenceId);
    setEditingArticle(article);
  };

  const handleDelete = async (id) => {
    await deleteArticle(id);
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="article-page">
      <h1>Articles</h1>
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Conference:</label>
          <select value={conferenceId} onChange={(e) => setConferenceId(e.target.value)} required>
            <option value="">Select Conference</option>
            {conferences.map(conference => (
              <option key={conference.id} value={conference.id}>{conference.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">{editingArticle ? 'Resubmit Article' : 'Submit Article'}</button>
      </form>
      <h2>Article List</h2>
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Conference: {article.conferenceId}</p>
            <button onClick={() => handleEdit(article)}>Edit</button>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;