import React from 'react';
import Create from './Create';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>EMPLOYER DASHBOARD</h2>
      <button>
        <Link to="/">Home</Link>
      </button>
      <Create />
    </div>
  );
}

export default Dashboard;
