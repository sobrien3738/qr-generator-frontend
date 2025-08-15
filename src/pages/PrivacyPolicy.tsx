import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              When you use QRGen Pro, we collect information you provide directly to us, such as when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Generate QR codes</li>
              <li>Subscribe to our services</li>
              <li>Contact us for support</li>
            </ul>
            <p>
              This information may include your name, email address, payment information, and QR code data.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Generate analytics to improve our services</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist us in operating our services</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
              is 100% secure.
            </p>
          </section>

          <section>
            <h2>5. Analytics and Tracking</h2>
            <p>
              We collect analytics data about QR code scans to provide insights to our users. This includes:
            </p>
            <ul>
              <li>Scan location and time</li>
              <li>Device and browser information</li>
              <li>Referring websites</li>
            </ul>
            <p>
              This data is anonymized and used solely to provide analytics services to QR code creators.
            </p>
          </section>

          <section>
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and store 
              certain information. You can instruct your browser to refuse all cookies or indicate when 
              a cookie is being sent.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your QR code data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@qrgen.pro">privacy@qrgen.pro</a>
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/">← Back to Home</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;