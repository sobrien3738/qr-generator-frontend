import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Star, Zap, Crown } from 'lucide-react';
import './Pricing.css';

const Pricing: React.FC = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal use and testing',
      icon: <Star className="plan-icon" />,
      features: [
        '5 QR codes per month',
        '100 scans per month',
        'Basic QR code generation',
        'PNG download',
        'No analytics',
        'Standard support'
      ],
      limitations: [
        'No customization',
        'No analytics tracking',
        'No data export'
      ],
      buttonText: user ? 'Current Plan' : 'Get Started Free',
      buttonClass: 'plan-button plan-button-free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'Best for small businesses and marketers',
      icon: <Zap className="plan-icon" />,
      features: [
        '100 QR codes per month',
        '10,000 scans per month',
        'Full customization options',
        'Analytics & tracking',
        'PNG, SVG, PDF downloads',
        'Data export',
        'Priority support',
        'Custom colors & logos',
        'Bulk QR generation'
      ],
      buttonText: user?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      buttonClass: 'plan-button plan-button-pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: 'per month',
      description: 'For large teams and organizations',
      icon: <Crown className="plan-icon" />,
      features: [
        'Unlimited QR codes',
        'Unlimited scans',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'SSO integration',
        'Custom domains'
      ],
      buttonText: user?.plan === 'enterprise' ? 'Current Plan' : 'Contact Sales',
      buttonClass: 'plan-button plan-button-enterprise',
      popular: false
    }
  ];

  return (
    <div className="pricing">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that fits your needs. Upgrade or downgrade at any time.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div 
            key={plan.name} 
            className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
          >
            {plan.popular && (
              <div className="popular-badge">
                Most Popular
              </div>
            )}

            <div className="plan-header">
              {plan.icon}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="plan-features">
              <h4>What's included:</h4>
              <ul className="features-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <Check className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.limitations && (
                <div className="plan-limitations">
                  <h4>Limitations:</h4>
                  <ul className="limitations-list">
                    {plan.limitations.map((limitation, limitIndex) => (
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
                <Link to="/register" className={plan.buttonClass}>
                  {plan.buttonText}
                </Link>
              ) : user.plan === plan.name.toLowerCase() ? (
                <button className={`${plan.buttonClass} current-plan`} disabled>
                  {plan.buttonText}
                </button>
              ) : (
                <button className={plan.buttonClass}>
                  {plan.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
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
            <h3>Is there a free trial for paid plans?</h3>
            <p>Yes! All paid plans come with a 14-day free trial. No credit card required to start.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I get a custom plan for my organization?</h3>
            <p>Yes! Contact our sales team to discuss custom Enterprise plans with specific requirements and pricing.</p>
          </div>
        </div>
      </div>

      <div className="pricing-cta">
        <h2>Ready to get started?</h2>
        <p>Join thousands of businesses using our QR code generator to boost their marketing efforts.</p>
        {!user && (
          <Link to="/register" className="cta-button">
            Start Free Trial
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pricing;