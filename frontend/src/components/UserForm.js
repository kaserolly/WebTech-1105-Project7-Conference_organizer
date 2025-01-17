import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const roles = ['Admin', 'Organizer', 'Reviewer', 'Author'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, role });
    setUsername('');
    setRole('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create User</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default UserForm;
