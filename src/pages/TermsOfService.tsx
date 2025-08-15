import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using QRGen Pro, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              QRGen Pro is a QR code generation and analytics service that allows users to:
            </p>
            <ul>
              <li>Create custom QR codes</li>
              <li>Track QR code analytics</li>
              <li>Customize QR code appearance</li>
              <li>Export QR code data</li>
            </ul>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              To access certain features, you must register for an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Updating your information as necessary</li>
            </ul>
          </section>

          <section>
            <h2>4. Subscription Plans and Billing</h2>
            <p>
              QRGen Pro offers both free and paid subscription plans:
            </p>
            <ul>
              <li><strong>Free Plan:</strong> Limited to 5 QR codes with basic features</li>
              <li><strong>Pro Plan:</strong> $9/month for 100 QR codes with advanced analytics</li>
              <li><strong>Business Plan:</strong> $49/month for 1,000 QR codes with enterprise features</li>
            </ul>
            <p>
              Subscription fees are billed in advance on a monthly basis. You may cancel your subscription 
              at any time, and cancellation will take effect at the end of the current billing period.
            </p>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree not to use the service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware, spam, or harmful content</li>
              <li>Harass, abuse, or harm others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2>6. QR Code Content and Usage</h2>
            <p>
              You retain ownership of the content you link through QR codes. However, you grant us 
              permission to generate and display QR codes based on your provided URLs and data.
            </p>
            <p>
              QR codes remain active as long as your account is in good standing. We reserve the right 
              to disable QR codes that violate our acceptable use policy.
            </p>
          </section>

          <section>
            <h2>7. Service Availability</h2>
            <p>
              While we strive for high availability, we do not guarantee that the service will be 
              available 100% of the time. We may perform maintenance, updates, or experience 
              technical difficulties that temporarily affect service availability.
            </p>
          </section>

          <section>
            <h2>8. Data and Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how 
              we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2>9. Intellectual Property</h2>
            <p>
              The QRGen Pro service, including its design, functionality, and content (excluding user-generated 
              content), is owned by us and protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall QRGen Pro be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses.
            </p>
          </section>

          <section>
            <h2>11. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee for all paid subscriptions. If you're not satisfied 
              with our service, contact us within 30 days of your initial payment for a full refund.
            </p>
          </section>

          <section>
            <h2>12. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for conduct 
              that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of significant 
              changes via email or through our service. Your continued use after such modifications 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@qrgen.pro">legal@qrgen.pro</a>
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/">← Back to Home</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;