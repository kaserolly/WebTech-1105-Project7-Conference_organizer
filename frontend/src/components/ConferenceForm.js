import React, { useState } from 'react';

const ConferenceForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, date });
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create Conference</h3>
      <input
        type="text"
        placeholder="Conference Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default ConferenceForm;
