import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../utils/api';
import { QRCode } from '../types';
import { QrCode, BarChart3, Download, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchQRCodes();
    }
  }, [user]);

  const fetchQRCodes = async () => {
    try {
      const response = await qrAPI.getUserQRCodes();
      setQrCodes(response.qrCodes);
    } catch (err: any) {
      setError('Failed to fetch QR codes');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await qrAPI.updateQRCode(id, { isActive: !isActive });
      setQrCodes(qrCodes.map(qr => 
        qr.id === id ? { ...qr, isActive: !isActive } : qr
      ));
    } catch (err) {
      setError('Failed to update QR code');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this QR code?')) {
      return;
    }

    try {
      await qrAPI.deleteQRCode(id);
      setQrCodes(qrCodes.filter(qr => qr.id !== id));
    } catch (err) {
      setError('Failed to delete QR code');
    }
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          Please log in to access your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your QR codes and track their performance</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <QrCode className="stat-icon" />
          <div className="stat-info">
            <h3>{user.usage?.qrCodesCreated || 0}</h3>
            <p>QR Codes Created</p>
          </div>
        </div>

        <div className="stat-card">
          <BarChart3 className="stat-icon" />
          <div className="stat-info">
            <h3>{user.usage?.monthlyScans || 0}</h3>
            <p>Total Scans</p>
          </div>
        </div>

        <div className="stat-card">
          <Eye className="stat-icon" />
          <div className="stat-info">
            <h3>{qrCodes.filter(qr => qr.isActive).length}</h3>
            <p>Active QR Codes</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading your QR codes...</div>
        ) : qrCodes.length === 0 ? (
          <div className="empty-state">
            <QrCode size={64} />
            <h3>No QR codes yet</h3>
            <p>Create your first QR code to get started</p>
            <a href="/" className="create-button">
              Create QR Code
            </a>
          </div>
        ) : (
          <div className="qr-grid">
            {qrCodes.map((qrCode) => (
              <div key={qrCode.id} className="qr-card">
                <div className="qr-card-header">
                  <h3 className="qr-card-title">
                    {qrCode.title || 'Untitled QR Code'}
                  </h3>
                  <div className="qr-card-actions">
                    <button
                      onClick={() => handleToggleActive(qrCode.id, qrCode.isActive || false)}
                      className="action-btn"
                      title={qrCode.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {qrCode.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(qrCode.id)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="qr-card-content">
                  <img 
                    src={qrCode.qrCodeData} 
                    alt="QR Code" 
                    className="qr-preview"
                  />
                  
                  <div className="qr-info">
                    <p className="qr-url">{qrCode.originalUrl}</p>
                    
                    {qrCode.description && (
                      <p className="qr-description">{qrCode.description}</p>
                    )}

                    <div className="qr-stats">
                      <span className="stat">
                        {qrCode.analytics?.totalScans || 0} scans
                      </span>
                      <span className={`status ${qrCode.isActive ? 'active' : 'inactive'}`}>
                        {qrCode.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="qr-card-footer">
                      <a 
                        href={`/qr/${qrCode.id}`}
                        className="view-analytics-btn"
                      >
                        <BarChart3 size={16} />
                        View Details
                      </a>
                      
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = qrCode.qrCodeData;
                          link.download = `qr-${qrCode.shortId}.png`;
                          link.click();
                        }}
                        className="download-btn"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;