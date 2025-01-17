import React from 'react';

const UsersList = ({ users }) => (
  <div className="card">
    <h3>User List</h3>
    <ul>
      {users.map((user) => (
        <li key={user.username}>
          {user.username} ({user.role})
        </li>
      ))}
    </ul>
  </div>
);

export default UsersList;
