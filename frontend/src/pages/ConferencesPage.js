import React, { useEffect, useState } from 'react';
import { fetchConferences, createConference, updateConference, deleteConference, assignReviewers } from '../api/conferenceApi';
import { fetchUsers } from '../api/userApi';
import './ConferencesPage.css';

const ConferencesPage = () => {
  const [conferences, setConferences] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [editingConference, setEditingConference] = useState(null);

  useEffect(() => {
    const fetchAllConferences = async () => {
      const data = await fetchConferences();
      setConferences(data);
    };

    const fetchAllReviewers = async () => {
      const users = await fetchUsers();
      setReviewers(users.filter(user => user.role === 'Reviewer'));
    };

    fetchAllConferences();
    fetchAllReviewers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conferenceData = { name, date, location, description };
    if (editingConference) {
      await updateConference(editingConference.id, conferenceData);
      setConferences(conferences.map(conference => (conference.id === editingConference.id ? { ...conference, ...conferenceData } : conference)));
      setEditingConference(null);
    } else {
      const newConference = await createConference(conferenceData);
      await assignReviewers(newConference.id, selectedReviewers);
      setConferences([...conferences, newConference]);
    }
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setSelectedReviewers([]);
  };

  const handleEdit = (conference) => {
    setName(conference.name);
    setDate(conference.date);
    setLocation(conference.location);
    setDescription(conference.description);
    setSelectedReviewers(conference.reviewers || []);
    setEditingConference(conference);
  };

  const handleDelete = async (id) => {
    await deleteConference(id);
    setConferences(conferences.filter(conference => conference.id !== id));
  };

  const handleReviewerChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedReviewers(value);
  };

  return (
    <div className="conference-page">
      <h1>Conferences</h1>
      <form onSubmit={handleSubmit} className="conference-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Assign Reviewers:</label>
          <select multiple value={selectedReviewers} onChange={handleReviewerChange}>
            {reviewers.map(reviewer => (
              <option key={reviewer.id} value={reviewer.id}>{reviewer.username}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">{editingConference ? 'Update Conference' : 'Create Conference'}</button>
      </form>
      <h2>Conference List</h2>
      <div className="conference-list">
        {conferences.map((conference) => (
          <div key={conference.id} className="conference-card">
            <h3>{conference.name}</h3>
            <p>{conference.date}</p>
            <p>{conference.location}</p>
            <p>{conference.description}</p>
            <button onClick={() => handleEdit(conference)}>Edit</button>
            <button onClick={() => handleDelete(conference.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferencesPage;