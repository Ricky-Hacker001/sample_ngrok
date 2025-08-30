import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const fetchDashboardData = async () => {
      const response = await fetch(`${API_URL}/api/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        // Handle error, e.g., token expired
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{dashboardData.message}</p>
      <p>{dashboardData.userData}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;