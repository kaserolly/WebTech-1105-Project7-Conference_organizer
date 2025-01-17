import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    fetchAllUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, role };
    if (editingUser) {
      await updateUser(editingUser.id, userData);
      setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...userData } : user)));
      setEditingUser(null);
    } else {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
    }
    setUsername('');
    setRole('');
  };

  const handleEdit = (user) => {
    setUsername(user.username);
    setRole(user.role);
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="users-page">
      <h1>Users</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Organizer">Organizer</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Author">Author</option>
          </select>
        </div>
        <button type="submit" className="submit-button">{editingUser ? 'Update User' : 'Add User'}</button>
      </form>
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <p>Role: {user.role}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;