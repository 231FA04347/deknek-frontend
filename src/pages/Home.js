import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🚀 Welcome to Deknek</h1>
        <p>A complete MERN Stack application with authentication</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>🔐 Secure Authentication</h3>
            <p>JWT-based user authentication with password hashing</p>
          </div>
          
          <div className="feature-card">
            <h3>📱 User Management</h3>
            <p>Create, update, and manage user profiles</p>
          </div>
          
          <div className="feature-card">
            <h3>🗄️ MongoDB Integration</h3>
            <p>Persistent data storage with MongoDB Atlas</p>
          </div>
          
          <div className="feature-card">
            <h3>⚡ React Frontend</h3>
            <p>Modern React with routing and context API</p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/signup" className="btn-primary btn-large">Get Started</Link>
          <Link to="/login" className="btn-secondary btn-large">Already have account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
