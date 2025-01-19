import React, { useEffect, useState } from 'react';
import { fetchConferences, createConference, updateConference, deleteConference } from '../api/conferenceApi';
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

  const handleCreateConference = async () => {
    const newConference = { name, date, location, description, reviewers: selectedReviewers.map(Number) };
    const createdConference = await createConference(newConference);
    setConferences([...conferences, createdConference]);
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setSelectedReviewers([]);
  };

  const handleUpdateConference = async () => {
    const updatedConference = { ...editingConference, name, date, location, description, reviewers: selectedReviewers.map(Number) };
    const result = await updateConference(updatedConference.id, updatedConference);
    setConferences(conferences.map(conference => (conference.id === result.id ? result : conference)));
    setEditingConference(null);
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setSelectedReviewers([]);
  };

  const handleDeleteConference = async (id) => {
    await deleteConference(id);
    setConferences(conferences.filter(conference => conference.id !== id));
  };

  const handleEditConference = (conference) => {
    setEditingConference(conference);
    setName(conference.name);
    setDate(conference.date);
    setLocation(conference.location);
    setDescription(conference.description);
    setSelectedReviewers(conference.reviewers.map(String));
  };

  return (
    <div className="conferences-page">
      <h1>Conferences</h1>
      <div className="conference-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="reviewers">Reviewers</label>
          <select id="reviewers" multiple value={selectedReviewers} onChange={(e) => setSelectedReviewers([...e.target.selectedOptions].map(option => option.value))}>
            {reviewers.map(reviewer => (
              <option key={reviewer.id} value={reviewer.id}>{reviewer.username}</option>
            ))}
          </select>
        </div>
        <div className="selected-reviewers">
          <h3>Selected Reviewers:</h3>
          <ul>
            {selectedReviewers.map(reviewerId => {
              const reviewer = reviewers.find(r => r.id === Number(reviewerId));
              return reviewer ? <li key={reviewer.id}>{reviewer.username}</li> : null;
            })}
          </ul>
        </div>
        {editingConference ? (
          <button onClick={handleUpdateConference}>Update Conference</button>
        ) : (
          <button onClick={handleCreateConference}>Create Conference</button>
        )}
      </div>
      <div className="conference-list">
        {conferences && conferences.map(conference => (
          <div key={conference.id} className="conference-card">
            <h2>{conference.name}</h2>
            <p>Date: {conference.date}</p>
            <p>Location: {conference.location}</p>
            <p>Description: {conference.description}</p>
            <p>Reviewers:</p>
            <ul>
              {conference.reviewers && conference.reviewers.map(reviewerId => {
                const reviewer = reviewers.find(r => r.id === reviewerId);
                return reviewer ? <li key={reviewer.id}>{reviewer.username}</li> : null;
              })}
            </ul>
            <button onClick={() => handleEditConference(conference)}>Edit</button>
            <button onClick={() => handleDeleteConference(conference.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferencesPage;