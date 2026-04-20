import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.deleteAccount();
        logout();
        toast.success('Account deleted successfully');
        navigate('/signup');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>🎉 Welcome, {user?.firstName}!</h1>
          <div className="navbar-actions">
            <button onClick={() => navigate('/profile')} className="btn-secondary">
              My Profile
            </button>
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Your Information</h2>
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <button onClick={() => navigate('/profile')} className="btn-primary">
            Edit Profile
          </button>
        </div>

        <div className="users-list-card">
          <h2>All Users ({allUsers.length})</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="users-grid">
              {allUsers.map(u => (
                <div key={u._id} className="user-card">
                  <p><strong>{u.firstName} {u.lastName}</strong></p>
                  <p>{u.email}</p>
                  <small>Joined: {new Date(u.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <button onClick={handleDeleteAccount} className="btn-danger">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
