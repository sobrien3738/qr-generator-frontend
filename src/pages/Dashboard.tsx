import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../utils/api';
import { downloadQRCode, downloadQRCodeFromDataURL, FileFormat } from '../utils/download';
import { QRCode } from '../types';
import { QrCode, BarChart3, Download, Edit, Trash2, Eye, EyeOff, Crown, TrendingUp, AlertCircle } from 'lucide-react';
import QRModal from '../components/QRModal';
import FormatDropdown from '../components/FormatDropdown';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQR, setSelectedQR] = useState<QRCode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadFormats, setDownloadFormats] = useState<{ [key: string]: FileFormat }>({});

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

  const handleView = (qrCode: QRCode) => {
    setSelectedQR(qrCode);
    setShowModal(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = async (qrCode: QRCode, format: FileFormat) => {
    try {
      if (format === 'png') {
        // Use existing data URL for PNG
        downloadQRCodeFromDataURL(qrCode.qrCodeData, qrCode.shortId || qrCode.id, format);
      } else {
        // For SVG and PDF, use the API endpoint
        await downloadQRCode(qrCode.id, format);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getSelectedFormat = (qrCodeId: string): FileFormat => {
    return downloadFormats[qrCodeId] || 'png';
  };

  const setSelectedFormat = (qrCodeId: string, format: FileFormat) => {
    setDownloadFormats(prev => ({ ...prev, [qrCodeId]: format }));
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

  const qrCodesUsed = user.usage?.qrCodesCreated || 0;
  const qrCodesLimit = user.limits.maxQRCodes;
  const usagePercentage = (qrCodesUsed / qrCodesLimit) * 100;
  const isNearLimit = usagePercentage >= 80;

  const renderUpgradeBanner = () => {
    if (user.plan === 'business') return null;

    if (user.plan === 'free') {
      return (
        <div className="upgrade-banner upgrade-banner-free">
          <div className="upgrade-content">
            <div className="upgrade-icon">
              <Crown size={24} />
            </div>
            <div className="upgrade-text">
              <h3>Unlock More with QRGen Pro</h3>
              <p>Get 100 QR codes, analytics, custom colors, and priority support for just $9/month</p>
            </div>
            <a href="/pricing" className="upgrade-button">
              Upgrade to Pro
            </a>
          </div>
        </div>
      );
    }

    if (user.plan === 'pro') {
      return (
        <div className="upgrade-banner upgrade-banner-pro">
          <div className="upgrade-content">
            <div className="upgrade-icon">
              <TrendingUp size={24} />
            </div>
            <div className="upgrade-text">
              <h3>Scale to Business Level</h3>
              <p>Get 1,000 QR codes, advanced analytics, API access, and white-label options</p>
            </div>
            <a href="/pricing" className="upgrade-button-secondary">
              Upgrade to Business
            </a>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderUsageWarning = () => {
    if (isNearLimit && user.plan !== 'business') {
      return (
        <div className="usage-warning">
          <AlertCircle size={20} />
          <span>You're using {qrCodesUsed} of {qrCodesLimit} QR codes ({Math.round(usagePercentage)}%). </span>
          <a href="/pricing">Upgrade now</a> to avoid limits.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your QR codes and track their performance</p>
      </div>

      {renderUpgradeBanner()}
      {renderUsageWarning()}

      <div className="dashboard-stats">
        <div className="stat-card">
          <QrCode className="stat-icon" />
          <div className="stat-info">
            <h3>{qrCodesUsed} / {qrCodesLimit}</h3>
            <p>QR Codes Used</p>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${isNearLimit ? 'progress-warning' : ''}`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
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
                    onError={(e) => {
                      console.error('Failed to load QR code preview:', qrCode.qrCodeData);
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNEREREREQiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTk5OTkiPlFSIEVycm9yPC90ZXh0Pgo8L3N2Zz4=';
                    }}
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
                      <button
                        onClick={() => handleView(qrCode)}
                        className="qr-footer-btn view-btn"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <a 
                        href={`/qr/${qrCode.id}`}
                        className="qr-footer-btn analytics-btn"
                      >
                        <BarChart3 size={14} />
                        Stats
                      </a>
                      
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormatDropdown
                          selectedFormat={getSelectedFormat(qrCode.id)}
                          onFormatChange={(format) => setSelectedFormat(qrCode.id, format)}
                          onDownload={(format) => handleDownload(qrCode, format)}
                          className="compact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedQR && (
        <QRModal
          qrCode={selectedQR}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedQR(null);
          }}
          onCopyUrl={copyToClipboard}
          copied={copied}
        />
      )}
    </div>
  );
};

export default Dashboard;