import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart3, TrendingUp, Users, Eye, Calendar, ArrowLeft, Crown } from 'lucide-react';
import './QRCodeDetail.css';

interface QRAnalytics {
  totalScans: number;
  lastScanned?: string;
  createdAt: string;
  dailyScans: Array<{
    date: string;
    scans: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  recentScans: Array<{
    timestamp: string;
    userAgent: string;
    location?: any;
  }>;
}

const QRCodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<QRAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && id) {
      fetchQRAnalytics();
    }
  }, [user, id]);

  const fetchQRAnalytics = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/analytics/qr/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch QR analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err: any) {
      setError('Failed to load QR analytics');
      console.error('QR analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const renderChart = () => {
    if (!analytics?.dailyScans) return null;

    const maxScans = Math.max(...analytics.dailyScans.map(d => d.scans));
    const chartHeight = 200;

    return (
      <div className="qr-chart-container">
        <h3>Scans Over Time (Last 30 Days)</h3>
        <div className="qr-chart">
          <div className="qr-chart-bars">
            {analytics.dailyScans.map((day, index) => {
              const height = maxScans > 0 ? (day.scans / maxScans) * chartHeight : 0;
              return (
                <div key={day.date} className="qr-chart-bar-container">
                  <div
                    className="qr-chart-bar"
                    style={{ height: `${height}px` }}
                    title={`${day.scans} scans on ${formatDate(day.date)}`}
                  >
                    <span className="qr-chart-value">{day.scans > 0 ? day.scans : ''}</span>
                  </div>
                  {index % 7 === 0 && (
                    <span className="qr-chart-label">{formatDate(day.date)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="qr-detail">
        <div className="qr-detail-error">
          Please log in to access QR analytics.
        </div>
      </div>
    );
  }

  if (user.plan === 'free') {
    return (
      <div className="qr-detail">
        <div className="qr-detail-header">
          <Link to="/dashboard" className="back-button">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>QR Code Analytics</h1>
          <p>Analytics for QR Code: {id}</p>
        </div>

        <div className="qr-upgrade-prompt">
          <div className="upgrade-content">
            <BarChart3 size={48} className="upgrade-icon" />
            <div className="upgrade-text">
              <h3>Unlock Detailed QR Analytics</h3>
              <p>Get insights into individual QR code performance, scan locations, devices, and trends with QRGen Pro.</p>
              <div className="upgrade-features">
                <div className="upgrade-feature">
                  <TrendingUp size={20} />
                  <span>30-day performance charts</span>
                </div>
                <div className="upgrade-feature">
                  <Users size={20} />
                  <span>Device & browser analytics</span>
                </div>
                <div className="upgrade-feature">
                  <Calendar size={20} />
                  <span>Scan history & timestamps</span>
                </div>
              </div>
            </div>
            <Link to="/pricing" className="upgrade-button">
              <Crown size={20} />
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="qr-detail">
        <div className="qr-detail-header">
          <Link to="/dashboard" className="back-button">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>QR Code Analytics</h1>
          <p>Loading your insights...</p>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="qr-detail">
        <div className="qr-detail-header">
          <Link to="/dashboard" className="back-button">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>QR Code Analytics</h1>
          <p>Analytics for QR Code: {id}</p>
        </div>
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchQRAnalytics} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-detail">
      <div className="qr-detail-header">
        <Link to="/dashboard" className="back-button">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1>QR Code Analytics</h1>
        <p>Analytics for QR Code: {id}</p>
      </div>

      {/* Overview Stats */}
      <div className="qr-stats">
        <div className="qr-stat-card">
          <Eye className="qr-stat-icon" />
          <div className="qr-stat-info">
            <h3>{analytics?.totalScans || 0}</h3>
            <p>Total Scans</p>
          </div>
        </div>

        <div className="qr-stat-card">
          <Calendar className="qr-stat-icon" />
          <div className="qr-stat-info">
            <h3>{analytics?.lastScanned ? formatTimeAgo(analytics.lastScanned) : 'Never'}</h3>
            <p>Last Scan</p>
          </div>
        </div>

        <div className="qr-stat-card">
          <TrendingUp className="qr-stat-icon" />
          <div className="qr-stat-info">
            <h3>{analytics?.createdAt ? formatTimeAgo(analytics.createdAt) : 'Unknown'}</h3>
            <p>Created</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="qr-chart-section">
        {renderChart()}
      </div>

      {/* Device Stats */}
      {analytics?.deviceStats && analytics.deviceStats.length > 0 && (
        <div className="qr-section">
          <h2>Device Analytics</h2>
          <div className="device-stats">
            {analytics.deviceStats.map((stat, index) => (
              <div key={stat.device} className="device-stat">
                <div className="device-info">
                  <span className="device-name">{stat.device}</span>
                  <span className="device-count">{stat.count} scans</span>
                </div>
                <div className="device-bar">
                  <div 
                    className="device-bar-fill" 
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
                <span className="device-percentage">{stat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Scans */}
      {analytics?.recentScans && analytics.recentScans.length > 0 && (
        <div className="qr-section">
          <h2>Recent Scans</h2>
          <div className="recent-scans">
            {analytics.recentScans.map((scan, index) => (
              <div key={index} className="recent-scan">
                <div className="scan-time">
                  {formatTimeAgo(scan.timestamp)}
                </div>
                <div className="scan-details">
                  <span className="scan-user-agent">
                    {scan.userAgent || 'Unknown device'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {analytics?.totalScans === 0 && (
        <div className="empty-state">
          <p>No scans yet. Share your QR code to start seeing analytics!</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeDetail;