import React from 'react';

const ConferenceList = ({ conferences }) => (
  <div className="card">
    <h3>Conference List</h3>
    <ul>
      {conferences.map((conference) => (
        <li key={conference.id}>
          {conference.name} - {conference.date}
        </li>
      ))}
    </ul>
  </div>
);

export default ConferenceList;
