import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Star, Zap, Crown, Loader } from 'lucide-react';
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
        const response = await fetch('/api/billing/plans');
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
      const response = await fetch('/api/billing/create-checkout-session', {
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
      icon: <Star className="plan-icon" />,
      description: 'Perfect for personal use and getting started',
      period: 'forever',
      features: [
        'Basic QR code generation',
        'Limited customization',
        'PNG downloads',
        'Standard support'
      ],
      limitations: [
        'No analytics tracking',
        'No data export',
        'Basic features only'
      ],
      buttonText: user?.plan === 'free' ? 'Current Plan' : 'Get Started Free',
      buttonClass: 'plan-button plan-button-free',
      popular: false,
      planType: 'free'
    },
    {
      name: 'Pro',
      icon: <Zap className="plan-icon" />,
      description: 'Best for small businesses and marketers',
      period: 'per month',
      features: [
        'Analytics & tracking',
        'Custom colors',
        'Priority support',
        'Advanced customization',
        'Data export capabilities'
      ],
      buttonText: user?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      buttonClass: 'plan-button plan-button-pro',
      popular: true,
      planType: 'pro'
    },
    {
      name: 'Business',
      icon: <Crown className="plan-icon" />,
      description: 'For large teams and organizations',
      period: 'per month',
      features: [
        'Unlimited QR codes',
        'Advanced analytics',
        'API access',
        'White-label options',
        'Dedicated support',
        'Priority features'
      ],
      buttonText: user?.plan === 'business' ? 'Current Plan' : 'Upgrade to Business',
      buttonClass: 'plan-button plan-button-business',
      popular: false,
      planType: 'business'
    }
  ];

  return (
    <div className="pricing">
      <div className="pricing-header">
        <h1>QRGen Pro Pricing</h1>
        <p>Choose the plan that fits your needs. Upgrade or downgrade at any time with secure Stripe billing.</p>
      </div>

      <div className="pricing-grid">
        {planConfigs.map((planConfig) => {
          const backendPlan = plans.find(p => p.name.toLowerCase() === planConfig.name.toLowerCase());
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
                    ${backendPlan ? backendPlan.price : (planConfig.name === 'Free' ? '0' : '...')}
                  </span>
                  <span className="period">/{planConfig.period}</span>
                </div>
                <p className="plan-description">{planConfig.description}</p>
                {backendPlan && (
                  <p className="plan-qr-limit">
                    Up to {backendPlan.maxQRCodes} QR codes
                  </p>
                )}
              </div>

              <div className="plan-features">
                <h4>What's included:</h4>
                <ul className="features-list">
                  {(backendPlan?.features || planConfig.features).map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <Check className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {planConfig.limitations && (
                  <div className="plan-limitations">
                    <h4>Limitations:</h4>
                    <ul className="limitations-list">
                      {planConfig.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="limitation-item">
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <p>Yes! Our Free plan includes up to 10 QR codes with basic functionality. Perfect for personal use and testing.</p>
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