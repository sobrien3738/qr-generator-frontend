import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Star, Zap, Crown, Loader, BarChart3, Palette, Shield, Headphones } from 'lucide-react';
import './Pricing.css';

interface Plan {
  name: string;
  price: number;
  maxQRCodes: number;
  features: string[];
  stripePriceId: string | null;
}

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [publishableKey, setPublishableKey] = useState('');

  // Fetch plans from backend API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${API_BASE_URL}/api/billing/plans`);
        const data = await response.json();
        setPlans(data.plans);
        setPublishableKey(data.publishableKey);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleUpgrade = async (planType: string) => {
    if (!user) {
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE_URL}/api/billing/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planType: planType.toLowerCase() }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session:', data.error);
        alert('Failed to start checkout. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const planConfigs = [
    {
      name: 'Free',
      price: 0,
      maxQRCodes: 5,
      icon: <Star className="plan-icon" />,
      description: 'Perfect for personal use and getting started',
      period: 'forever',
      subtitle: 'Great for testing and personal projects',
      features: [
        { icon: <Check size={12} />, text: 'Quick QR generation', included: true },
        { icon: <Check size={12} />, text: 'Basic scan tracking', included: true },
        { icon: <Check size={12} />, text: 'PNG downloads', included: true },
        { icon: <Check size={12} />, text: 'Community support', included: true }
      ],
      highlight: null,
      buttonText: user?.plan === 'free' ? 'Current Plan' : 'Get Started Free',
      buttonClass: 'plan-button plan-button-free',
      popular: false,
      planType: 'free'
    },
    {
      name: 'Pro',
      price: 9,
      maxQRCodes: 100,
      icon: <Zap className="plan-icon" />,
      description: 'Best for small businesses and marketers',
      period: 'per month',
      subtitle: 'Everything you need to grow your business',
      features: [
        { icon: <Check size={12} />, text: 'Everything in Free, plus:', included: true, highlight: true },
        { icon: <Check size={12} />, text: 'Advanced analytics & insights', included: true },
        { icon: <Check size={12} />, text: 'Custom colors & branding', included: true },
        { icon: <Check size={12} />, text: 'Data export (CSV/PDF)', included: true },
        { icon: <Check size={12} />, text: 'Priority support (4hr)', included: true },
        { icon: <Check size={12} />, text: 'Mobile dashboard', included: true },
        { icon: <Check size={12} />, text: 'Bulk QR generation', included: true }
      ],
      highlight: 'Most Popular - Perfect for growing businesses',
      buttonText: user?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      buttonClass: 'plan-button plan-button-pro',
      popular: true,
      planType: 'pro'
    },
    {
      name: 'Business',
      price: 49,
      maxQRCodes: 1000,
      icon: <Crown className="plan-icon" />,
      description: 'For large teams and organizations',
      period: 'per month',
      subtitle: 'Scale with enterprise-grade features',
      features: [
        { icon: <Check size={12} />, text: 'Everything in Pro, plus:', included: true, highlight: true },
        { icon: <Check size={12} />, text: 'API access & integrations', included: true },
        { icon: <Check size={12} />, text: 'Team management', included: true },
        { icon: <Check size={12} />, text: 'White-label options', included: true },
        { icon: <Check size={12} />, text: 'Dedicated account manager', included: true },
        { icon: <Check size={12} />, text: 'Advanced security (SSO)', included: true },
        { icon: <Check size={12} />, text: 'Custom dashboards', included: true },
        { icon: <Check size={12} />, text: 'Priority feature access', included: true }
      ],
      highlight: 'Enterprise Ready - Built for scale',
      buttonText: user?.plan === 'business' ? 'Current Plan' : 'Upgrade to Business',
      buttonClass: 'plan-button plan-button-business',
      popular: false,
      planType: 'business'
    }
  ];

  return (
    <div className="pricing">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that fits your needs. Start free, upgrade as you grow.</p>
        <div className="value-proposition">
          <div className="value-item">
            <BarChart3 className="value-icon" />
            <span>Track every scan with detailed analytics</span>
          </div>
          <div className="value-item">
            <Palette className="value-icon" />
            <span>Customize colors to match your brand</span>
          </div>
          <div className="value-item">
            <Shield className="value-icon" />
            <span>Enterprise-grade security & reliability</span>
          </div>
          <div className="value-item">
            <Headphones className="value-icon" />
            <span>World-class support when you need it</span>
          </div>
        </div>
      </div>

      <div className="pricing-grid">
        {planConfigs.map((planConfig) => {
          const isCurrentPlan = user?.plan === planConfig.planType;
          
          return (
            <div 
              key={planConfig.name} 
              className={`pricing-card ${planConfig.popular ? 'pricing-card-popular' : ''}`}
            >
              {planConfig.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}

              <div className="plan-header">
                {planConfig.icon}
                <h3 className="plan-name">{planConfig.name}</h3>
                <div className="plan-price">
                  <span className="price">
                    ${(planConfig as any).price}
                  </span>
                  <span className="period">/{planConfig.period}</span>
                </div>
                <p className="plan-description">{planConfig.description}</p>
                <p className="plan-subtitle">{planConfig.subtitle}</p>
                <div className="plan-qr-limit">
                  <strong>Up to {(planConfig as any).maxQRCodes === 1000 ? '1,000' : (planConfig as any).maxQRCodes} QR codes</strong>
                </div>
                {planConfig.highlight && (
                  <div className="plan-highlight">
                    {planConfig.highlight}
                  </div>
                )}
              </div>

              <div className="plan-features">
                <ul className="enhanced-features-list">
                  {planConfig.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`enhanced-feature-item ${(feature as any).highlight ? 'feature-highlight' : ''}`}>
                      <span className="feature-icon">
                        {(feature as any).icon}
                      </span>
                      <span className="feature-text">{(feature as any).text}</span>
                    </li>
                  ))}
                </ul>

              </div>

              <div className="plan-action">
                {!user ? (
                  <Link to="/register" className={planConfig.buttonClass}>
                    Get Started Free
                  </Link>
                ) : isCurrentPlan ? (
                  <button className={`${planConfig.buttonClass} current-plan`} disabled>
                    Current Plan
                  </button>
                ) : planConfig.planType === 'free' ? (
                  <Link to="/dashboard" className={planConfig.buttonClass}>
                    Continue with Free
                  </Link>
                ) : (
                  <button 
                    className={planConfig.buttonClass}
                    onClick={() => handleUpgrade(planConfig.planType)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin mr-2" size={16} />
                        Processing...
                      </>
                    ) : (
                      planConfig.buttonText
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I change plans at any time?</h3>
            <p>Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate your billing.</p>
          </div>
          
          <div className="faq-item">
            <h3>What happens to my QR codes if I downgrade?</h3>
            <p>Your existing QR codes will continue to work, but you may lose access to premium features like analytics and customization.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer refunds?</h3>
            <p>We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you offer a free plan?</h3>
            <p>Yes! Our Free plan includes up to 5 QR codes with basic functionality. Perfect for personal use and testing.</p>
          </div>
          
          <div className="faq-item">
            <h3>How secure is your payment processing?</h3>
            <p>All payments are processed securely through Stripe, a PCI-compliant payment processor trusted by millions of businesses worldwide.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I upgrade to a Business plan?</h3>
            <p>Absolutely! Our Business plan offers up to 1,000 QR codes with advanced analytics, API access, and priority support.</p>
          </div>
        </div>
      </div>

      <div className="pricing-cta">
        <h2>Ready to get started with QRGen Pro?</h2>
        <p>Join businesses worldwide using our advanced QR code generator to boost their marketing and analytics.</p>
        {!user && (
          <Link to="/register" className="cta-button">
            Start Free Today
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pricing;