import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Type, 
  Palette, 
  Download, 
  Share2, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  Smartphone,
  Globe,
  Zap,
  Shield
} from 'lucide-react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up & Choose Your Plan',
      description: 'Create your free account in seconds. Start with 5 free QR codes or upgrade to unlock advanced features and higher limits.',
      icon: <UserPlus size={32} />,
      details: [
        'No credit card required for free plan',
        'Instant account activation',
        'Choose from Free, Pro, or Business plans',
        'Upgrade or downgrade anytime'
      ],
      image: '/images/step1.png'
    },
    {
      number: '02',
      title: 'Enter Your Content',
      description: 'Add the URL, text, or contact information you want to encode. Our platform supports all major QR code types.',
      icon: <Type size={32} />,
      details: [
        'URLs, text, email, phone numbers',
        'WiFi credentials and contact cards',
        'Social media profiles and app stores',
        'GPS coordinates and calendar events'
      ],
      image: '/images/step2.png'
    },
    {
      number: '03',
      title: 'Customize Your Design',
      description: 'Make your QR codes stand out with custom colors, logos, and patterns. Match your brand identity perfectly.',
      icon: <Palette size={32} />,
      details: [
        'Custom foreground and background colors',
        'Add your logo or brand mark',
        'Choose from different corner styles',
        'Preview changes in real-time'
      ],
      image: '/images/step3.png'
    },
    {
      number: '04',
      title: 'Generate & Download',
      description: 'Your QR code is generated instantly with tracking enabled. Download in multiple formats for any use case.',
      icon: <Download size={32} />,
      details: [
        'PNG for digital use',
        'SVG for scalable graphics',
        'PDF for print materials',
        'High resolution up to 2000px'
      ],
      image: '/images/step4.png'
    },
    {
      number: '05',
      title: 'Share & Deploy',
      description: 'Use your QR codes anywhere - print, digital, marketing materials. They work on all devices and platforms.',
      icon: <Share2 size={32} />,
      details: [
        'Print on business cards, flyers, posters',
        'Add to websites and email signatures',
        'Include in social media posts',
        'Works with all QR scanners and cameras'
      ],
      image: '/images/step5.png'
    },
    {
      number: '06',
      title: 'Track & Analyze',
      description: 'Monitor performance with detailed analytics. See who\'s scanning, when, and from where in real-time.',
      icon: <BarChart3 size={32} />,
      details: [
        'Real-time scan tracking',
        'Location and device analytics',
        'Time-based performance charts',
        'Export data for reporting'
      ],
      image: '/images/step6.png'
    }
  ];

  const benefits = [
    {
      icon: <Zap size={24} />,
      title: 'Lightning Fast',
      description: 'QR codes generated in milliseconds with global CDN delivery'
    },
    {
      icon: <Shield size={24} />,
      title: 'Enterprise Security',
      description: 'HTTPS encryption, GDPR compliance, and secure data centers'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Optimized',
      description: 'Perfect scanning experience on all devices and QR readers'
    },
    {
      icon: <Globe size={24} />,
      title: 'Global Reach',
      description: 'Works worldwide with 99.9% uptime and reliable performance'
    }
  ];

  return (
    <div className="how-it-works">
      <div className="how-hero">
        <div className="hero-content">
          <h1>How QRGen Pro Works</h1>
          <p>
            Create professional QR codes with advanced tracking in just 6 simple steps. 
            From design to deployment, we make it easy to connect your physical and digital presence.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="cta-button primary">
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link to="/pricing" className="cta-button secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      <div className="steps-section">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className={`step ${index % 2 === 0 ? 'step-left' : 'step-right'}`}>
              <div className="step-content">
                <div className="step-header">
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul className="step-details">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>
                      <CheckCircle size={16} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <ArrowRight className="connector-arrow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="benefits-section">
        <div className="benefits-container">
          <h2>Why Choose QRGen Pro?</h2>
          <p>Built for professionals who need more than basic QR generation</p>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features-showcase">
        <div className="showcase-container">
          <h2>Advanced Features</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-visual">
                <BarChart3 size={48} className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3>Real-time Analytics</h3>
                <p>Track every scan with detailed insights including location, device type, time stamps, and user behavior patterns.</p>
                <ul>
                  <li>Geographic heat maps</li>
                  <li>Device and browser analytics</li>
                  <li>Time-based performance charts</li>
                  <li>CSV/PDF export options</li>
                </ul>
              </div>
            </div>

            <div className="feature">
              <div className="feature-visual">
                <Palette size={48} className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3>Brand Customization</h3>
                <p>Make your QR codes uniquely yours with custom colors, logos, and styling options that match your brand.</p>
                <ul>
                  <li>Custom color schemes</li>
                  <li>Logo and brand mark integration</li>
                  <li>Multiple corner styles</li>
                  <li>Pattern customization</li>
                </ul>
              </div>
            </div>

            <div className="feature">
              <div className="feature-visual">
                <Shield size={48} className="feature-icon" />
              </div>
              <div className="feature-content">
                <h3>Enterprise Security</h3>
                <p>Your data is protected with enterprise-grade security, GDPR compliance, and reliable infrastructure.</p>
                <ul>
                  <li>HTTPS encryption everywhere</li>
                  <li>GDPR compliant data handling</li>
                  <li>SOC 2 Type II certified</li>
                  <li>99.9% uptime SLA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="getting-started">
        <div className="getting-started-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of professionals who trust QRGen Pro for their QR code needs.</p>
          
          <div className="stats">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">500K+</div>
              <div className="stat-label">QR Codes Created</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>

          <div className="final-cta">
            <Link to="/register" className="cta-button primary large">
              Start Your Free Account
              <ArrowRight size={24} />
            </Link>
            <p className="cta-note">No credit card required • 5 QR codes free • Upgrade anytime</p>
          </div>
        </div>
      </div>

      <div className="help-section">
        <div className="help-content">
          <h3>Need Help Getting Started?</h3>
          <p>Our support team and comprehensive resources are here to help you succeed.</p>
          <div className="help-links">
            <Link to="/faq" className="help-link">
              Browse FAQ
            </Link>
            <Link to="/contact" className="help-link">
              Contact Support
            </Link>
            <a href="mailto:support@qrgen.pro" className="help-link">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;