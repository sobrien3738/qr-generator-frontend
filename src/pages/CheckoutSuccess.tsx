import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowRight, BarChart3, Palette, Download, Headphones } from 'lucide-react';
import { authAPI } from '../utils/api';
import './CheckoutSuccess.css';

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh user data to get updated plan information
    const refreshUserData = async () => {
      try {
        const { user: updatedUser } = await authAPI.getProfile();
        updateUser(updatedUser);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      refreshUserData();
    } else {
      setLoading(false);
    }
  }, [user, updateUser]);

  if (loading) {
    return (
      <div className="checkout-success">
        <div className="success-container">
          <div className="loading-spinner"></div>
          <h1>Processing your upgrade...</h1>
          <p>Please wait while we activate your new plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-success">
      <div className="success-container">
        <div className="success-icon">
          <CheckCircle size={80} />
        </div>
        
        <div className="success-content">
          <h1>Welcome to QRGen Pro! 🎉</h1>
          <p className="success-message">
            Your payment was successful and your account has been upgraded. 
            You now have access to all Pro features!
          </p>
          
          {sessionId && (
            <div className="session-info">
              <small>Session ID: {sessionId}</small>
            </div>
          )}
        </div>

        <div className="features-unlocked">
          <h2>What's New for You</h2>
          <div className="features-grid">
            <div className="feature-card">
              <BarChart3 className="feature-icon" />
              <h3>Advanced Analytics</h3>
              <p>Track location, device types, and scan patterns with detailed charts and insights.</p>
            </div>
            
            <div className="feature-card">
              <Palette className="feature-icon" />
              <h3>Custom Branding</h3>
              <p>Customize QR code colors and add your brand styling to match your design.</p>
            </div>
            
            <div className="feature-card">
              <Download className="feature-icon" />
              <h3>Data Export</h3>
              <p>Export your analytics and scan data to CSV and PDF for reporting.</p>
            </div>
            
            <div className="feature-card">
              <Headphones className="feature-icon" />
              <h3>Priority Support</h3>
              <p>Get faster response times and dedicated support when you need help.</p>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>Get Started</h2>
          <div className="action-buttons">
            <Link to="/dashboard" className="primary-button">
              <BarChart3 size={20} />
              View Dashboard
              <ArrowRight size={20} />
            </Link>
            
            <Link to="/analytics" className="secondary-button">
              <BarChart3 size={20} />
              Explore Analytics
            </Link>
            
            <Link to="/" className="secondary-button">
              Create QR Code
            </Link>
          </div>
        </div>

        <div className="help-section">
          <h3>Need Help Getting Started?</h3>
          <p>Check out our <a href="/help">help center</a> or contact support at support@qrgen.pro</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;