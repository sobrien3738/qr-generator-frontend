import React from 'react';
import { QRCode } from '../types';
import { downloadDataURL } from '../utils/download';
import { X, Download, Printer, Copy, CheckCircle } from 'lucide-react';
import './QRModal.css';

interface QRModalProps {
  qrCode: QRCode;
  isOpen: boolean;
  onClose: () => void;
  onCopyUrl?: (url: string) => void;
  copied?: boolean;
}

const QRModal: React.FC<QRModalProps> = ({ 
  qrCode, 
  isOpen, 
  onClose, 
  onCopyUrl,
  copied = false 
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const filename = `qr-code-${qrCode.shortId || qrCode.id}-large.png`;
    downloadDataURL(qrCode.qrCodeData, filename);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${qrCode.title}</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif; 
                text-align: center; 
              }
              .qr-code { 
                max-width: 100%; 
                height: auto; 
                margin: 20px 0; 
              }
              .details { 
                margin-top: 20px; 
                text-align: left; 
                max-width: 600px; 
                margin: 20px auto; 
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <h1>${qrCode.title}</h1>
            <img src="${qrCode.qrCodeData}" alt="QR Code" class="qr-code" />
            <div class="details">
              <p><strong>URL:</strong> ${qrCode.originalUrl}</p>
              ${qrCode.description ? `<p><strong>Description:</strong> ${qrCode.description}</p>` : ''}
              <p><strong>Short URL:</strong> ${qrCode.shortUrl}</p>
              <p><strong>Created:</strong> ${new Date(qrCode.createdAt).toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{qrCode.title || 'QR Code'}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="qr-display-large">
            <img 
              src={qrCode.qrCodeData} 
              alt="QR Code" 
              className="qr-image-large"
            />
          </div>

          <div className="qr-details-modal">
            <div className="detail-row">
              <span className="detail-label">Target URL:</span>
              <span className="detail-value">{qrCode.originalUrl}</span>
            </div>

            {qrCode.description && (
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{qrCode.description}</span>
              </div>
            )}

            <div className="detail-row">
              <span className="detail-label">Short URL:</span>
              <div className="url-copy-group">
                <code className="detail-url">{qrCode.shortUrl}</code>
                {onCopyUrl && (
                  <button
                    onClick={() => onCopyUrl(qrCode.shortUrl)}
                    className="copy-btn-modal"
                    title="Copy URL"
                  >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">Created:</span>
              <span className="detail-value">
                {new Date(qrCode.createdAt).toLocaleDateString()}
              </span>
            </div>

            {qrCode.analytics && (
              <div className="detail-row">
                <span className="detail-label">Total Scans:</span>
                <span className="detail-value">{qrCode.analytics.totalScans || 0}</span>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button onClick={handleDownload} className="modal-action-btn primary">
              <Download size={18} />
              Download Large
            </button>

            <button onClick={handlePrint} className="modal-action-btn secondary">
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;