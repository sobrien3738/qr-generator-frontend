import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowLeft, Crown, BarChart3, Palette, Download } from 'lucide-react';
import './CheckoutCancel.css';

const CheckoutCancel: React.FC = () => {
  return (
    <div className="checkout-cancel">
      <div className="cancel-container">
        <div className="cancel-icon">
          <X size={80} />
        </div>
        
        <div className="cancel-content">
          <h1>Checkout Cancelled</h1>
          <p className="cancel-message">
            No payment was processed. You can return to upgrade anytime to unlock 
            Pro features and grow your QR code capacity.
          </p>
        </div>

        <div className="missed-features">
          <h2>What You're Missing</h2>
          <div className="features-preview">
            <div className="feature-item">
              <BarChart3 className="feature-icon" />
              <div className="feature-info">
                <h3>Advanced Analytics</h3>
                <p>Detailed insights into scan patterns, device types, and performance metrics</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Palette className="feature-icon" />
              <div className="feature-info">
                <h3>Custom Branding</h3>
                <p>Match your brand with custom colors and styling options</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Download className="feature-icon" />
              <div className="feature-info">
                <h3>Data Export</h3>
                <p>Export analytics to CSV and PDF for reports and presentations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="special-offer">
          <div className="offer-content">
            <Crown className="offer-icon" />
            <h3>Limited Time: First Month 50% Off</h3>
            <p>Join thousands of businesses using QRGen Pro for their marketing campaigns</p>
            <div className="offer-details">
              <span className="original-price">$9/month</span>
              <span className="discounted-price">$4.50/month</span>
              <span className="offer-tag">First Month</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/pricing" className="upgrade-button">
            <Crown size={20} />
            Try Pro for $4.50
          </Link>
          
          <Link to="/dashboard" className="secondary-button">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          
          <Link to="/" className="secondary-button">
            Continue with Free
          </Link>
        </div>

        <div className="reassurance">
          <h3>Questions About Upgrading?</h3>
          <div className="faq-items">
            <div className="faq-item">
              <strong>Can I cancel anytime?</strong>
              <span>Yes, cancel your subscription at any time with no questions asked.</span>
            </div>
            <div className="faq-item">
              <strong>30-day money back guarantee?</strong>
              <span>Absolutely! Full refund if you're not satisfied within 30 days.</span>
            </div>
            <div className="faq-item">
              <strong>What happens to my QR codes?</strong>
              <span>Your existing QR codes continue working forever, even if you downgrade.</span>
            </div>
          </div>
          
          <p className="contact-info">
            Still have questions? Contact us at <a href="mailto:support@qrgen.pro">support@qrgen.pro</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;