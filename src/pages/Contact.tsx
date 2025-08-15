import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Headphones } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'support'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'support'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="contact">
        <div className="contact-success">
          <CheckCircle className="success-icon" />
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>Have questions? Need help? Want to discuss enterprise solutions? We're here to help you succeed with QRGen Pro.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <Mail className="info-icon" />
            <h3>Email Support</h3>
            <p>support@qrgen.pro</p>
            <span className="info-note">Response within 24 hours</span>
          </div>

          <div className="info-card">
            <MessageSquare className="info-icon" />
            <h3>Live Chat</h3>
            <p>Available in dashboard</p>
            <span className="info-note">Business hours: 9 AM - 6 PM EST</span>
          </div>

          <div className="info-card">
            <Headphones className="info-icon" />
            <h3>Priority Support</h3>
            <p>Pro & Business plans</p>
            <span className="info-note">4-hour response time</span>
          </div>

          <div className="contact-details">
            <h3>Other Ways to Reach Us</h3>
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <div>
                <strong>Address</strong>
                <p>123 Technology Drive<br />San Francisco, CA 94105</p>
              </div>
            </div>
            
            <div className="detail-item">
              <Clock className="detail-icon" />
              <div>
                <strong>Business Hours</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br />Saturday: 10:00 AM - 2:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inquiryType">Inquiry Type</label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                required
              >
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Please provide as much detail as possible to help us assist you better."
              />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-faq">
        <h2>Common Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How quickly will you respond?</h3>
            <p>We respond to all inquiries within 24 hours. Pro and Business plan customers receive priority support with 4-hour response times.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer phone support?</h3>
            <p>Currently, we provide support through email and live chat. Phone support is available for Enterprise customers.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I schedule a demo?</h3>
            <p>Yes! Contact our sales team to schedule a personalized demo of QRGen Pro's features and capabilities.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer custom integrations?</h3>
            <p>We offer API access and custom integrations for Business and Enterprise plans. Contact us to discuss your specific needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;