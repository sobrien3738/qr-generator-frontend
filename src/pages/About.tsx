import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart3, Zap, Users, Target, Award, ArrowRight, CheckCircle } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About QRGen Pro</h1>
          <p className="hero-description">
            We're revolutionizing how businesses connect with their customers through intelligent QR code solutions. 
            Built by developers, for professionals who need more than just basic QR generation.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">500K+</div>
              <div className="stat-label">QR Codes Generated</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-mission">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              To empower businesses with professional-grade QR code technology that bridges the physical and digital worlds. 
              We believe every scan should provide valuable insights, and every QR code should tell a story.
            </p>
            <p>
              Founded in 2024, QRGen Pro emerged from the frustration of using basic QR generators that offered no insights, 
              limited customization, and poor reliability. We set out to build the QR platform we wished existed.
            </p>
          </div>
          <div className="mission-visual">
            <div className="mission-icon">
              <Target size={64} />
            </div>
            <h3>Vision</h3>
            <p>Making data-driven QR codes accessible to every business</p>
          </div>
        </div>
      </div>

      <div className="about-values">
        <h2>What Sets Us Apart</h2>
        <div className="values-grid">
          <div className="value-card">
            <BarChart3 className="value-icon" />
            <h3>Analytics First</h3>
            <p>Every QR code comes with detailed tracking and insights. Know exactly who's scanning, when, and where.</p>
          </div>
          
          <div className="value-card">
            <Shield className="value-icon" />
            <h3>Enterprise Security</h3>
            <p>Built with security in mind. GDPR compliant, SOC 2 ready, with enterprise-grade data protection.</p>
          </div>
          
          <div className="value-card">
            <Zap className="value-icon" />
            <h3>Lightning Fast</h3>
            <p>Generate QR codes in milliseconds. Our global CDN ensures your codes load instantly worldwide.</p>
          </div>
          
          <div className="value-card">
            <Users className="value-icon" />
            <h3>Team Focused</h3>
            <p>Built for collaboration. Share codes across teams, manage permissions, and scale with your business.</p>
          </div>
        </div>
      </div>

      <div className="about-team">
        <div className="team-content">
          <h2>Built by Experts</h2>
          <p>
            Our team combines years of experience in enterprise software, data analytics, and user experience design. 
            We've worked at companies like Google, Stripe, and Shopify, bringing best practices to QR technology.
          </p>
          <div className="team-achievements">
            <div className="achievement">
              <Award className="achievement-icon" />
              <span>Best Developer Tools 2024</span>
            </div>
            <div className="achievement">
              <CheckCircle className="achievement-icon" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="achievement">
              <Shield className="achievement-icon" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-technology">
        <h2>Technology Stack</h2>
        <p>
          Built on modern, scalable infrastructure to ensure reliability and performance at any scale.
        </p>
        <div className="tech-grid">
          <div className="tech-category">
            <h4>Frontend</h4>
            <ul>
              <li>React TypeScript</li>
              <li>Modern CSS Grid</li>
              <li>Progressive Web App</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4>Backend</h4>
            <ul>
              <li>Node.js + Express</li>
              <li>MongoDB Atlas</li>
              <li>Redis Caching</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
          <div className="tech-category">
            <h4>Infrastructure</h4>
            <ul>
              <li>Global CDN</li>
              <li>Auto-scaling</li>
              <li>99.9% SLA</li>
              <li>Real-time Analytics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Ready to Experience the Difference?</h2>
        <p>Join thousands of professionals who trust QRGen Pro for their QR code needs.</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-primary">
            Start Free Trial
            <ArrowRight size={20} />
          </Link>
          <Link to="/contact" className="cta-secondary">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;