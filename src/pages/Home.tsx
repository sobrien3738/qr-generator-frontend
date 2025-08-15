import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../utils/api';
import { downloadDataURL } from '../utils/download';
import { QRCode } from '../types';
import { Download, Link as LinkIcon, Settings, BarChart3, Copy, CheckCircle, Eye } from 'lucide-react';
import QRModal from '../components/QRModal';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Customization options
  const [size, setSize] = useState(256);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [showCustomization, setShowCustomization] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Check plan limits for authenticated users
    if (user) {
      const currentUsage = user.usage?.qrCodesCreated || 0;
      const maxQRCodes = user.limits?.maxQRCodes || 5;
      
      if (currentUsage >= maxQRCodes) {
        setError(`Plan limit reached! You can create up to ${maxQRCodes} QR codes on the ${user.plan} plan. Upgrade for more capacity.`);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const data = {
        url: url.trim(),
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        size,
        foregroundColor,
        backgroundColor,
        errorCorrectionLevel,
      };

      const generatedQR = await qrAPI.generate(data);
      setQrCode(generatedQR);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to generate QR code';
      setError(errorMessage);
      
      // If it's a plan limit error, suggest upgrade
      if (errorMessage.includes('Plan limit reached') || errorMessage.includes('limit')) {
        setError(errorMessage + ' Upgrade to Pro for more QR codes and advanced features.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setTitle('');
    setDescription('');
    setQrCode(null);
    setError('');
    setCopied(false);
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

  const downloadQR = () => {
    if (!qrCode) return;
    
    const filename = `qr-code-${qrCode.shortId || 'download'}.png`;
    downloadDataURL(qrCode.qrCodeData, filename);
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Professional QR Codes with Analytics
          </h1>
          <p className="hero-description">
            Create, customize, and track QR codes that work. Get detailed analytics, custom branding, 
            and insights to grow your business. Trusted by 10,000+ professionals worldwide.
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <BarChart3 size={20} />
              <span>Advanced Analytics</span>
            </div>
            <div className="hero-feature">
              <Settings size={20} />
              <span>Custom Branding</span>
            </div>
            <div className="hero-feature">
              <Download size={20} />
              <span>Instant Downloads</span>
            </div>
          </div>
          {!user && (
            <div className="hero-cta">
              <a href="/register" className="hero-button hero-button-primary">
                Start Free - 5 QR Codes
              </a>
              <a href="/pricing" className="hero-button hero-button-secondary">
                View Pricing
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="generator-container">
        {/* Usage Indicator for Authenticated Users */}
        {user && (
          <div className="usage-indicator">
            <div className="usage-header">
              <span className="usage-title">QR Code Usage</span>
              <span className="usage-stats">
                {user.usage?.qrCodesCreated || 0} / {user.limits?.maxQRCodes || 5} used
              </span>
            </div>
            <div className="usage-bar">
              <div 
                className="usage-bar-fill" 
                style={{ 
                  width: `${Math.min(((user.usage?.qrCodesCreated || 0) / (user.limits?.maxQRCodes || 5)) * 100, 100)}%` 
                }}
              ></div>
            </div>
            {(user.usage?.qrCodesCreated || 0) >= (user.limits?.maxQRCodes || 5) * 0.8 && (
              <div className="usage-warning">
                {user.plan === 'free' ? (
                  <span>
                    Almost at your limit! <a href="/pricing">Upgrade to Pro</a> for unlimited QR codes.
                  </span>
                ) : (
                  <span>
                    Running low on QR codes. <a href="/pricing">Upgrade to Business</a> for more capacity.
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="generator-form">
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label htmlFor="url" className="form-label">
                <LinkIcon size={18} />
                Enter your URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="instagram.com, www.example.com, or https://google.com"
                className="form-input"
                required
              />
              <small className="form-hint">
                You can enter URLs with or without https:// - we'll handle it automatically!
              </small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title (optional)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My QR Code"
                  className="form-input"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description (optional)
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description for your QR code"
                  className="form-input"
                  maxLength={500}
                />
              </div>
            </div>

            {(user?.limits.canCustomize || !user) && (
              <div className="customization-toggle">
                <button
                  type="button"
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="toggle-btn"
                >
                  <Settings size={18} />
                  Customize QR Code
                </button>
              </div>
            )}

            {showCustomization && (
              <div className="customization-panel">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="size" className="form-label">
                      Size (px)
                    </label>
                    <input
                      type="range"
                      id="size"
                      min="128"
                      max="512"
                      step="32"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <span className="range-value">{size}px</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="errorLevel" className="form-label">
                      Error Correction
                    </label>
                    <select
                      id="errorLevel"
                      value={errorCorrectionLevel}
                      onChange={(e) => setErrorCorrectionLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                      className="form-select"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="foreground" className="form-label">
                      Foreground Color
                    </label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        id="foreground"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="form-color"
                      />
                      <input
                        type="text"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="form-input color-text"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="background" className="form-label">
                      Background Color
                    </label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        id="background"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="form-color"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="form-input color-text"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading || Boolean(user && (user.usage?.qrCodesCreated || 0) >= (user.limits?.maxQRCodes || 5))}
                className={`generate-btn ${user && (user.usage?.qrCodesCreated || 0) >= (user.limits?.maxQRCodes || 5) ? 'disabled' : ''}`}
              >
                {loading ? 'Generating...' : 
                 user && (user.usage?.qrCodesCreated || 0) >= (user.limits?.maxQRCodes || 5) ? 
                 'Plan Limit Reached' : 'Generate QR Code'}
              </button>
              
              {qrCode && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="reset-btn"
                >
                  Generate Another
                </button>
              )}
            </div>
          </form>
        </div>

        {qrCode && (
          <div className="qr-result">
            <div className="qr-display">
              <img 
                src={qrCode.qrCodeData} 
                alt="Generated QR Code" 
                className="qr-image"
                onError={(e) => {
                  console.error('Failed to load QR code image:', qrCode.qrCodeData);
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNEREREREQiLz4KPHRleHQgeD0iMTI4IiB5PSIxMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSI+UVIgQ29kZSBFcnJvcjwvdGV4dD4KPC9zdmc+';
                }}
                onLoad={() => {
                  console.log('QR code image loaded successfully');
                }}
              />
            </div>

            <div className="qr-details">
              <h3 className="qr-title">
                {qrCode.title || 'Your QR Code'}
              </h3>
              
              {qrCode.description && (
                <p className="qr-description">{qrCode.description}</p>
              )}

              <div className="qr-url">
                <span className="url-label">Short URL:</span>
                <div className="url-copy-group">
                  <code className="short-url">{qrCode.shortUrl}</code>
                  <button
                    onClick={() => copyToClipboard(qrCode.shortUrl)}
                    className="copy-btn"
                    title="Copy URL"
                  >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="qr-actions">
                <button onClick={() => setShowModal(true)} className="action-btn view-btn">
                  <Eye size={18} />
                  View Large
                </button>

                <button onClick={downloadQR} className="action-btn download-btn">
                  <Download size={18} />
                  Download PNG
                </button>

                {user?.limits.canTrackAnalytics && (
                  <a href={`/qr/${qrCode.id}`} className="action-btn analytics-btn">
                    <BarChart3 size={18} />
                    View Analytics
                  </a>
                )}
              </div>

              {!user && (
                <div className="upgrade-prompt">
                  <p>
                    <a href="/register">Sign up for free</a> to track analytics, 
                    manage your QR codes, and unlock premium features!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <BarChart3 className="feature-icon" />
            <h3>Analytics Tracking</h3>
            <p>Track scans, devices, locations, and performance with detailed analytics.</p>
          </div>
          
          <div className="feature-card">
            <Settings className="feature-icon" />
            <h3>Customizable Design</h3>
            <p>Customize colors, sizes, and error correction levels to match your brand.</p>
          </div>
          
          <div className="feature-card">
            <Download className="feature-icon" />
            <h3>Multiple Formats</h3>
            <p>Download in PNG, SVG, or PDF formats for any use case.</p>
          </div>
        </div>
      </div>

      {qrCode && (
        <QRModal
          qrCode={qrCode}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCopyUrl={copyToClipboard}
          copied={copied}
        />
      )}
    </div>
  );
};

export default Home;