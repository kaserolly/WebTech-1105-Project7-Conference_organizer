import React, { useEffect, useState } from 'react';
import { fetchArticles, createArticle, updateArticle, deleteArticle, resubmitArticle } from '../api/articleApi';
import { fetchConferences } from '../api/conferenceApi';
import './ArticlePage.css';

const ArticleSubmissionPage = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Reverted from abstract to content
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
    if (editingArticle) {
      await updateArticle(editingArticle.id, { title, content, conferenceId });
    } else {
      await createArticle({ title, content, conferenceId });
    }
    setTitle('');
    setContent('');
    setConferenceId('');
    setEditingArticle(null);
    const data = await fetchArticles();
    setArticles(data);
  };

  return (
    <div>
      <h1>Article Submission</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content: {/* Reverted from Abstract to Content */}
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Conference:
          <select value={conferenceId} onChange={(e) => setConferenceId(e.target.value)}>
            <option value="">Select Conference</option>
            {conferences.map((conference) => (
              <option key={conference.id} value={conference.id}>
                {conference.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{editingArticle ? 'Update' : 'Submit'}</button>
      </form>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title} - {article.content}
            <button onClick={() => setEditingArticle(article)}>Edit</button>
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => resubmitArticle(article.id)}>Resubmit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSubmissionPage;