import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, TrendingUp, Users, Eye, Calendar } from 'lucide-react';
import './Analytics.css';

interface AnalyticsData {
  overview: {
    totalQRCodes: number;
    activeQRCodes: number;
    totalScans: number;
    scansThisMonth: number;
  };
  topPerforming: Array<{
    id: string;
    title: string;
    shortId: string;
    totalScans: number;
    lastScanned?: string;
    createdAt: string;
  }>;
  chartData: {
    dailyScans: Array<{
      date: string;
      scans: number;
    }>;
  };
}

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/analytics/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err: any) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
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
    if (!analytics?.chartData?.dailyScans) return null;

    const maxScans = Math.max(...analytics.chartData.dailyScans.map(d => d.scans));
    const chartHeight = 200;

    return (
      <div className="chart-container">
        <h3>Scans Over Time (Last 30 Days)</h3>
        <div className="chart">
          <div className="chart-bars">
            {analytics.chartData.dailyScans.map((day, index) => {
              const height = maxScans > 0 ? (day.scans / maxScans) * chartHeight : 0;
              return (
                <div key={day.date} className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{ height: `${height}px` }}
                    title={`${day.scans} scans on ${formatDate(day.date)}`}
                  >
                    <span className="chart-value">{day.scans > 0 ? day.scans : ''}</span>
                  </div>
                  {index % 7 === 0 && (
                    <span className="chart-label">{formatDate(day.date)}</span>
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
      <div className="analytics-container">
        <div className="analytics-error">
          Please log in to access analytics.
        </div>
      </div>
    );
  }

  if (user.plan === 'free') {
    return (
      <div className="analytics">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Detailed insights for your QR codes</p>
        </div>

        <div className="analytics-upgrade-prompt">
          <div className="upgrade-content">
            <BarChart3 size={48} className="upgrade-icon" />
            <div className="upgrade-text">
              <h3>Unlock Detailed Analytics</h3>
              <p>Get insights into scan locations, devices, performance trends, and more with QRGen Pro.</p>
              <div className="upgrade-features">
                <div className="upgrade-feature">
                  <TrendingUp size={20} />
                  <span>Performance trends & charts</span>
                </div>
                <div className="upgrade-feature">
                  <Users size={20} />
                  <span>Device & location analytics</span>
                </div>
                <div className="upgrade-feature">
                  <Calendar size={20} />
                  <span>Time-based insights</span>
                </div>
              </div>
            </div>
            <a href="/pricing" className="upgrade-button">
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="analytics">
        <div className="analytics-header">
          <h1>Analytics</h1>
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
      <div className="analytics">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Detailed insights for your QR codes</p>
        </div>
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchAnalytics} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Detailed insights for your QR codes</p>
      </div>

      {/* Overview Stats */}
      <div className="analytics-stats">
        <div className="stat-card">
          <Eye className="stat-icon" />
          <div className="stat-info">
            <h3>{analytics?.overview.totalScans || 0}</h3>
            <p>Total Scans</p>
          </div>
        </div>

        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <div className="stat-info">
            <h3>{analytics?.overview.scansThisMonth || 0}</h3>
            <p>This Month</p>
          </div>
        </div>

        <div className="stat-card">
          <BarChart3 className="stat-icon" />
          <div className="stat-info">
            <h3>{analytics?.overview.totalQRCodes || 0}</h3>
            <p>QR Codes</p>
          </div>
        </div>

        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-info">
            <h3>{analytics?.overview.activeQRCodes || 0}</h3>
            <p>Active Codes</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="analytics-chart-section">
        {renderChart()}
      </div>

      {/* Top Performing QR Codes */}
      <div className="analytics-section">
        <h2>Top Performing QR Codes</h2>
        {analytics?.topPerforming && analytics.topPerforming.length > 0 ? (
          <div className="top-performing-list">
            {analytics.topPerforming.map((qr, index) => (
              <div key={qr.id} className="top-performing-item">
                <div className="performance-rank">#{index + 1}</div>
                <div className="performance-info">
                  <h4>{qr.title}</h4>
                  <p className="performance-id">/{qr.shortId}</p>
                </div>
                <div className="performance-stats">
                  <div className="performance-scans">
                    <strong>{qr.totalScans}</strong>
                    <span>scans</span>
                  </div>
                  {qr.lastScanned && (
                    <div className="performance-last-scan">
                      Last: {formatTimeAgo(qr.lastScanned)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No QR code scans yet. Share your QR codes to start seeing analytics!</p>
          </div>
        )}
      </div>

      {/* Business Plan Upsell */}
      {user.plan === 'pro' && (
        <div className="business-upsell">
          <div className="upsell-content">
            <h3>Want Even More Insights?</h3>
            <p>Upgrade to Business for advanced analytics, team management, and API access.</p>
            <a href="/pricing" className="upsell-button">
              Upgrade to Business
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;