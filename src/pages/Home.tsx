import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../utils/api';
import { QRCode } from '../types';
import { Download, Link as LinkIcon, Settings, BarChart3, Copy, CheckCircle } from 'lucide-react';
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
      setError(err.response?.data?.error || 'Failed to generate QR code');
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
    
    const link = document.createElement('a');
    link.href = qrCode.qrCodeData;
    link.download = `qr-code-${qrCode.shortId}.png`;
    link.click();
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Generate QR Codes in Seconds
          </h1>
          <p className="hero-description">
            Create custom QR codes with analytics tracking. Perfect for marketing campaigns, 
            business cards, and sharing links with your audience.
          </p>
        </div>
      </div>

      <div className="generator-container">
        <div className="generator-form">
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label htmlFor="url" className="form-label">
                <LinkIcon size={18} />
                Enter your URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="form-input"
                required
              />
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
                disabled={loading}
                className="generate-btn"
              >
                {loading ? 'Generating...' : 'Generate QR Code'}
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
    </div>
  );
};

export default Home;