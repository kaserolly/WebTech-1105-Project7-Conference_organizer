import React, { useState } from 'react';

const CreateConferencePage = () => {
  const [conferenceData, setConferenceData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({
      ...conferenceData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/conferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conferenceData)
      });
      if (response.ok) {
        alert('Conference created successfully!');
      } else {
        alert('Failed to create conference.');
      }
    } catch (error) {
      console.error('Error creating conference:', error);
      alert('Error creating conference.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={conferenceData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={conferenceData.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={conferenceData.location} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={conferenceData.description} onChange={handleChange} required />
      </div>
      <button type="submit">Create Conference</button>
    </form>
  );
};

export default CreateConferencePage;