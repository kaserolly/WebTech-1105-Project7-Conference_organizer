import { API_BASE_URL } from './api';

export const fetchArticles = async () => {
  const response = await fetch(`${API_BASE_URL}/articles`);
  return response.json();
};

export const createArticle = async (articleData) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  return response.json();
};

export const updateArticle = async (id, articleData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  return response.json();
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const resubmitArticle = async (id, articleData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/resubmit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  return response.json();
};

export const reviewArticle = async (id, reviewData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  return response.json();
};