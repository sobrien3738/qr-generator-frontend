import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QrCode, User, LogOut, BarChart3 } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <QrCode className="brand-icon" />
          <span>QR Generator</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Generate
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                <BarChart3 size={18} />
                Dashboard
              </Link>
              
              <div className="navbar-user">
                <span className="user-name">{user.name}</span>
                <span className={`user-plan plan-${user.plan}`}>
                  {user.plan.toUpperCase()}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-auth">
              <Link to="/pricing" className="navbar-link">
                Pricing
              </Link>
              <Link to="/login" className="navbar-link">
                Sign In
              </Link>
              <Link to="/register" className="navbar-button">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;