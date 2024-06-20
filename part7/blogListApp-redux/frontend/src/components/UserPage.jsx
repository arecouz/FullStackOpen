import { useEffect, useState } from 'react';
import usersServices from '../services/users';
import { Link, useMatch } from 'react-router-dom';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  border: '2px solid white',
  padding: '8px',
  backgroundColor: 'black',
};

const tdStyle = {
  border: '2px solid white',
  padding: '8px',
  textAlign: 'center',
};

const UserPage = ({users}) => {
  return (
    <>
      <h1>Users:</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}><Link to={user.id}>{user.username}</Link></td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserPage;
