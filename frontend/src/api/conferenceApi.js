import { API_BASE_URL } from './api';

export const fetchConferences = async () => {
  const response = await fetch(`${API_BASE_URL}/conferences`);
  return response.json();
};

export const createConference = async (conferenceData) => {
  const response = await fetch(`${API_BASE_URL}/conferences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conferenceData),
  });
  return response.json();
};

export const updateConference = async (id, conferenceData) => {
  const response = await fetch(`${API_BASE_URL}/conferences/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conferenceData),
  });
  return response.json();
};

export const deleteConference = async (id) => {
  const response = await fetch(`${API_BASE_URL}/conferences/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const assignReviewers = async (conferenceId, reviewerIds) => {
  const response = await fetch(`${API_BASE_URL}/conferences/${conferenceId}/reviewers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewerIds }),
  });
  return response.json();
};